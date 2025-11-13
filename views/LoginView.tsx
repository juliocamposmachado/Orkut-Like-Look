
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/home');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orkut-blue p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white">💙 orkut nostalgia</h1>
            <p className="text-white mt-4">
                Bem-vindo de volta! Onde a amizade era sincera, os depoimentos eram de verdade e o amor era rosa.
            </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-orkut-text">Login</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-orkut-pink hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orkut-pink transition-transform transform hover:scale-105"
            >
              Entrar
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="font-medium text-orkut-pink hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
