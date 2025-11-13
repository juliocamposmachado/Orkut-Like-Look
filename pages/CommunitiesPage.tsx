
import React from 'react';
import type { User, Community } from '../types';
import { communities as allCommunities } from '../data/mockData';

interface CommunitiesPageProps {
  user: User;
}

const CommunitiesPage: React.FC<CommunitiesPageProps> = ({ user }) => {
  const communities = allCommunities.filter(c => user.communities.includes(c.id));

  return (
    <main className="flex-grow">
      <h2 className="text-2xl text-gray-600 font-normal mb-4">
        Comunidades de {user.name} ({communities.length})
      </h2>
      <div className="bg-white border border-gray-300 p-4 rounded-lg">
        <div className="space-y-4">
          {communities.map(community => (
            <div key={community.id} className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-50">
              <img src={community.imageUrl} alt={community.name} className="w-16 h-16 rounded-md object-cover" />
              <div>
                <a href="#" className="text-blue-600 font-bold hover:underline">
                  {community.name}
                </a>
                <p className="text-sm text-gray-600">{community.members.toLocaleString('pt-BR')} membros</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CommunitiesPage;
