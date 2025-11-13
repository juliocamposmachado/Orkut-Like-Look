import React from 'react';
import type { View, User } from '../types';

interface HeaderProps {
    user: User;
    setView: (view: View) => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, setView, onLogout }) => {
  return (
    <header className="bg-white w-full">
      <div className="container mx-auto flex items-center justify-between p-2">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-pink-500 mr-6">
            orkut
          </h1>
          <nav className="flex items-center space-x-4 text-sm text-gray-600">
            <button onClick={() => setView('profile')} className="hover:underline">Início</button>
            <button onClick={() => setView('profile')} className="hover:underline">Perfil</button>
            <button className="hover:underline">Recados</button>
            <button onClick={() => setView('friends')} className="hover:underline">Amigos</button>
            <button onClick={() => setView('communities')} className="hover:underline">Comunidades</button>
          </nav>
        </div>
        <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4">{user.email}</span>
            <button onClick={onLogout} className="text-sm text-blue-600 hover:underline">Sair</button>
        </div>
      </div>
      <div className="bg-[#e8eef7] w-full">
        <div className="container mx-auto flex items-center p-2">
            <input 
                type="text" 
                placeholder="Pesquisar no orkut"
                className="w-full text-sm border border-gray-400 rounded-sm px-2 py-0.5"
            />
            <button className="bg-gray-200 border border-gray-400 text-sm px-3 py-0.5 ml-2 rounded-sm">
                Procurar
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;