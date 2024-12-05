"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/signup', { email, password });
            router.push('/login');
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-gray-100">
            <h1 className="mb-4 text-4xl font-bold">Signup</h1>
            <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-4 py-2 border rounded"
                />
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Sign Up</button>
            </form>
        </div>
    );
}