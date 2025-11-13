
import React, { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HomeIcon, ProfileIcon, CommunityIcon, FriendsIcon, MessageIcon, LogoutIcon } from './icons';
import { getPopularCommunities } from '../services/storageService';

const Navbar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-orkut-pink">💙 orkut nostalgia</h1>
                <div className="hidden md:flex items-center space-x-4">
                    <input type="text" placeholder="Pesquisar..." className="px-3 py-1 border border-orkut-blue rounded-2xl focus:outline-none focus:ring-2 focus:ring-orkut-pink" />
                    <nav className="flex items-center space-x-6 text-orkut-text">
                        <NavLink to="/home" className={({isActive}) => `flex items-center space-x-1 hover:text-orkut-pink ${isActive ? 'text-orkut-pink' : ''}`}><HomeIcon className="w-5 h-5"/><span>Home</span></NavLink>
                        <NavLink to="/profile" className={({isActive}) => `flex items-center space-x-1 hover:text-orkut-pink ${isActive ? 'text-orkut-pink' : ''}`}><ProfileIcon className="w-5 h-5"/><span>Perfil</span></NavLink>
                        <NavLink to="/communities" className={({isActive}) => `flex items-center space-x-1 hover:text-orkut-pink ${isActive ? 'text-orkut-pink' : ''}`}><CommunityIcon className="w-5 h-5"/><span>Comunidades</span></NavLink>
                        <NavLink to="/friends" className={({isActive}) => `flex items-center space-x-1 hover:text-orkut-pink ${isActive ? 'text-orkut-pink' : ''}`}><FriendsIcon className="w-5 h-5"/><span>Amigos</span></NavLink>
                        <NavLink to="/messages" className={({isActive}) => `flex items-center space-x-1 hover:text-orkut-pink ${isActive ? 'text-orkut-pink' : ''}`}><MessageIcon className="w-5 h-5"/><span>Mensagens</span></NavLink>
                        <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-orkut-pink"><LogoutIcon className="w-5 h-5"/><span>Sair</span></button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

const Sidebar: React.FC = () => {
    const { currentUser } = useAuth();

    if (!currentUser) return null;

    return (
        <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-full mx-auto border-4 border-orkut-blue" />
                <h2 className="text-center font-bold mt-2 text-lg text-orkut-text">{currentUser.name}</h2>
                <p className="text-center text-gray-500 text-sm">{currentUser.mood}</p>
                 <div className="mt-4 space-y-2 text-sm">
                    <NavLink to="/profile" className="block text-orkut-text hover:text-orkut-pink">Meu Perfil</NavLink>
                    <NavLink to="/recados" className="block text-orkut-text hover:text-orkut-pink">Recados</NavLink>
                    <NavLink to="/photos" className="block text-orkut-text hover:text-orkut-pink">Fotos</NavLink>
                    <NavLink to="/depoimentos" className="block text-orkut-text hover:text-orkut-pink">Depoimentos</NavLink>
                </div>
            </div>
        </aside>
    );
};


const Suggestions: React.FC = () => {
    const communities = getPopularCommunities();

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0">
             <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-orkut-text mb-2">Comunidades Populares</h3>
                <ul className="space-y-2">
                    {communities.map(c => (
                        <li key={c.id} className="flex items-center space-x-2 text-sm">
                            <img src={c.imageUrl} alt={c.name} className="w-8 h-8 rounded"/>
                            <span className="text-orkut-text">{c.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

const Footer: React.FC = () => (
    <footer className="w-full mt-8 py-4 text-center text-gray-500 text-sm">
        <p>orkut nostalgia — made with 💙 for the internet’s good old days.</p>
    </footer>
);

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-orkut-gray text-orkut-text font-sans">
            <Navbar />
            <main className="container mx-auto px-4 pt-20 pb-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <Sidebar />
                    <div className="flex-grow">
                        {children}
                    </div>
                    <Suggestions />
                </div>
            </main>
            <Footer/>
        </div>
    );
};
