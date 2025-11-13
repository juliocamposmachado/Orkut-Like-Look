
import React from 'react';
import type { User } from '../types';
import { users as allUsers } from '../data/mockData';

interface FriendsPageProps {
  user: User;
}

const FriendsPage: React.FC<FriendsPageProps> = ({ user }) => {
  const friends = allUsers.filter(u => user.friends.includes(u.id));

  return (
    <main className="flex-grow">
      <h2 className="text-2xl text-gray-600 font-normal mb-4">
        Amigos de {user.name} ({friends.length})
      </h2>
      <div className="bg-white border border-gray-300 p-4 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {friends.map(friend => (
            <div key={friend.id} className="text-center">
              <img src={friend.avatarUrl} alt={friend.name} className="w-full h-auto rounded-md shadow-sm" />
              <a href="#" className="text-blue-600 text-sm mt-1 block truncate hover:underline">
                {friend.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FriendsPage;
