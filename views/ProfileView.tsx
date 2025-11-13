
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRecados, getDepoimentos, getPhotos, getUserById } from '../services/storageService';
import { Recado as RecadoType, Depoimento as DepoimentoType, Photo as PhotoType } from '../types';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            active ? 'bg-white text-orkut-pink border-b-2 border-orkut-pink' : 'bg-transparent text-gray-600 hover:bg-gray-100'
        }`}
    >
        {children}
    </button>
);

const RecadosTab: React.FC = () => {
    const recados = getRecados();
    return (
        <div className="space-y-4">
            <div className="p-4 border rounded-lg">
                <textarea className="w-full p-2 border rounded" placeholder="Deixe um recado..."></textarea>
                <button className="mt-2 bg-orkut-pink text-white px-3 py-1 rounded-2xl">Enviar</button>
            </div>
            {recados.map(recado => {
                const author = getUserById(recado.authorId);
                return (
                    <div key={recado.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img src={author?.avatar} className="w-10 h-10 rounded-full" alt={author?.name}/>
                        <div>
                            <p className="font-bold text-sm text-orkut-text">{author?.name}</p>
                            <p>{recado.text}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
};

const DepoimentosTab: React.FC = () => {
    const depoimentos = getDepoimentos();
    return (
        <div className="space-y-4">
             {depoimentos.map(depo => {
                const author = getUserById(depo.authorId);
                const statusColor = depo.status === 'approved' ? 'text-green-600' : 'text-yellow-600';
                return (
                     <div key={depo.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                             <img src={author?.avatar} className="w-10 h-10 rounded-full" alt={author?.name}/>
                             <p className="font-bold text-sm text-orkut-text">{author?.name}</p>
                             <span className={`text-xs font-semibold ${statusColor}`}>({depo.status})</span>
                        </div>
                        <p className="mt-2 pl-13">{depo.text}</p>
                    </div>
                )
            })}
        </div>
    )
};

const PhotosTab: React.FC = () => {
    const photos = getPhotos();
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map(photo => (
                <div key={photo.id}>
                    <img src={photo.url} alt={photo.caption} className="w-full h-auto rounded-lg shadow-md aspect-square object-cover" />
                    <p className="text-xs text-center mt-1">{photo.caption}</p>
                </div>
            ))}
        </div>
    )
};

export const ProfileView: React.FC = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('recados');

    if (!currentUser) return null;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'recados': return <RecadosTab />;
            case 'depoimentos': return <DepoimentosTab />;
            case 'photos': return <PhotosTab />;
            default: return null;
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-32 h-32 rounded-lg border-4 border-white shadow-lg" />
                <div>
                    <h2 className="text-3xl font-bold text-orkut-text">{currentUser.name}</h2>
                    <p className="text-gray-600 mt-2">{currentUser.profile.bio}</p>
                </div>
            </div>
            
            <div className="mt-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                        <TabButton active={activeTab === 'recados'} onClick={() => setActiveTab('recados')}>Recados</TabButton>
                        <TabButton active={activeTab === 'depoimentos'} onClick={() => setActiveTab('depoimentos')}>Depoimentos</TabButton>
                        <TabButton active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>Fotos</TabButton>
                    </nav>
                </div>
                <div className="mt-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};
