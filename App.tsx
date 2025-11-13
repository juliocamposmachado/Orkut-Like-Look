import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProfilePage from './pages/ProfilePage';
import FriendsPage from './pages/FriendsPage';
import CommunitiesPage from './pages/CommunitiesPage';
import LoginPage from './pages/LoginPage';
import { users, scraps, testimonials } from './data/mockData';
import type { User, View } from './types';

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('profile');

  const handleLoginSuccess = (googleUser: { name: string; email: string; picture: string; }) => {
    // Try to find a user in mock data with the same email
    const existingUser = users.find(u => u.email === googleUser.email);

    if (existingUser) {
      setLoggedInUser(existingUser);
    } else {
      // If no user is found, create a new one as a fallback
      const newUser: User = {
        id: Date.now(),
        name: googleUser.name,
        email: googleUser.email,
        avatarUrl: googleUser.picture,
        fullName: googleUser.name,
        relationshipStatus: 'Não especificado',
        city: 'Desconhecida',
        state: 'XX',
        country: 'Brasil',
        fans: 0,
        photos: 0,
        videos: 0,
        ratings: [],
        friends: [],
        communities: [],
      };
      setLoggedInUser(newUser);
    }
    setView('profile');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const renderView = () => {
    if (!loggedInUser) return null;

    // Filter scraps and testimonials for the logged-in user
    const userScraps = scraps.filter(s => s.recipientId === loggedInUser.id);
    const userTestimonials = testimonials.filter(t => t.recipientId === loggedInUser.id);

    switch (view) {
      case 'profile':
        return <ProfilePage user={loggedInUser} scraps={userScraps} testimonials={userTestimonials} />;
      case 'friends':
        return <FriendsPage user={loggedInUser} />;
      case 'communities':
        return <CommunitiesPage user={loggedInUser} />;
      default:
        return <ProfilePage user={loggedInUser} scraps={userScraps} testimonials={userTestimonials} />;
    }
  };

  if (!loggedInUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center font-sans">
      <Header user={loggedInUser} setView={setView} onLogout={handleLogout} />
      <div className="container mx-auto flex gap-6 p-4">
        <Sidebar user={loggedInUser} setView={setView}/>
        {renderView()}
      </div>
       <footer className="w-full py-4">
        <div className="container mx-auto text-center text-xs text-gray-500">
            © 2024 Orkut -
            <a href="#" className="text-blue-600 hover:underline mx-1">Sobre o Orkut</a>-
            <a href="#" className="text-blue-600 hover:underline mx-1">Termos de Uso</a>-
            <a href="#" className="text-blue-600 hover:underline mx-1">Privacidade</a>
        </div>
      </footer>
    </div>
  );
};

export default App;