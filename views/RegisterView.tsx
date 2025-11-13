
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegisterView: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            avatar: `https://picsum.photos/seed/${Date.now()}/200/200`,
            profile: {
                bio: '',
                interests: [],
                music: [],
                movies: []
            }
        };

        const registeredUser = register(newUser);
        if (registeredUser) {
            navigate('/home');
        } else {
            setError('Não foi possível criar a conta. O e-mail pode já estar em uso.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orkut-blue p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-orkut-pink mb-6">Criar Conta 💙</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orkut-pink focus:border-orkut-pink"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orkut-pink focus:border-orkut-pink"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orkut-pink focus:border-orkut-pink"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-orkut-pink hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orkut-pink"
                    >
                        Cadastrar
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/" className="font-medium text-orkut-pink hover:underline">
                        Faça login
                    </Link>
                </p>
            </div>
        </div>
    );
};
