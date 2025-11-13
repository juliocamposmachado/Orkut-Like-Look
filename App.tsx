
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { HomeView } from './views/HomeView';
import { ProfileView } from './views/ProfileView';
import { GenericView } from './views/GenericView';
import { ProtectedRoute } from './components/ProtectedRoute';
import { initializeData } from './services/storageService';

// Initialize mock data in localStorage on app start
initializeData();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/communities" element={<GenericView title="Comunidades" description="Esta página está em construção. Volte em breve para ver as comunidades!"/>} />
            <Route path="/friends" element={<GenericView title="Amigos" description="Esta página está em construção. Volte em breve para ver seus amigos!"/>} />
            <Route path="/messages" element={<GenericView title="Mensagens" description="Esta página está em construção. Volte em breve para ver suas mensagens!"/>} />
            <Route path="/recados" element={<ProfileView />} />
            <Route path="/depoimentos" element={<ProfileView />} />
            <Route path="/photos" element={<ProfileView />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
