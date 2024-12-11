from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from models import db  # Import the db instance
from models.user import User, Favorites
from models.book import Book
import os
from dotenv import load_dotenv
import requests

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  # Change this to a secure secret key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Initialize extensions
jwt = JWTManager(app)
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(name=data['name'], username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'name': user.name})
        return jsonify(access_token=access_token, name=user.name), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'logged_in_as': current_user}), 200

@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([{'id': book.id, 'title': book.title, 'author': book.author, 'genre': book.genre} for book in books]), 200

@app.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()
    new_book = Book(title=data['title'], author=data['author'], genre=data['genre'], category=data['category'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'message': 'Book added successfully'}), 201

@app.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()  # Assuming email is used as the identifier
    if user:
        return jsonify({
            'name': user.name,
            'username': user.username,
            'email': user.email
        }), 200
    return jsonify({'message': 'User not found'}), 404

@app.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()
    data = request.get_json()
    print("Received data:", data)  # Log the incoming data
    book_id = data['book_id']
    
    # Fetch book details from the external API
    book_response = requests.get(f'https://openlibrary.org{book_id}.json')
    book_data = book_response.json()
    print("Book data fetched:", book_data)  # Log the fetched book data

    if book_data:
        new_favorite = Favorites(
            user_id=user.id,
            book_id=book_id,
            title=book_data['title'],
            author=', '.join([author['name'] for author in book_data['authors']])
        )
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({'message': 'Book added to favorites'}), 200

    return jsonify({'message': 'Book not found'}), 404

@app.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()
    favorites = Favorites.query.filter_by(user_id=user.id).all()
    return jsonify([{'book_id': favorite.book_id, 'title': favorite.title, 'author': favorite.author} for favorite in favorites]), 200

@app.route('/sync_books', methods=['POST'])
def sync_books():
    genres = ["romance", "horror", "love", "science", "history", "fantasy"]
    for genre in genres:
        response = requests.get(f'https://openlibrary.org/subjects/{genre}.json')
        books = response.json().get('works', [])
        for book in books:
            new_book = Book(
                title=book['title'],
                author=', '.join([author['name'] for author in book['authors']]),
                genre=genre,
                category=book.get('category', 'General')  # Adjust as necessary
            )
            db.session.add(new_book)
    db.session.commit()
    return jsonify({'message': 'Books synced successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)