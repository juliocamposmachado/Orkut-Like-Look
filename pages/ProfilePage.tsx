
import React from 'react';
import type { User, Scrap, Testimonial, Community } from '../types';
import { users as allUsers, communities as allCommunities } from '../data/mockData';
import Scrapbook from '../components/Scrapbook';
import Testimonials from '../components/Testimonials';
import { SmileyIcon, HeartIcon, StarIcon } from '../components/Icons';

interface ProfilePageProps {
  user: User;
  scraps: Scrap[];
  testimonials: Testimonial[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, scraps, testimonials }) => {

  const friends = allUsers.filter(u => user.friends.includes(u.id));
  const communities = allCommunities.filter(c => user.communities.includes(c.id));
  
  const getRating = (category: 'confiável' | 'legal' | 'sexy') => {
      return user.ratings.find(r => r.category === category)?.count || 0;
  }

  return (
    <main className="flex-grow">
      <h2 className="text-2xl text-gray-600 font-normal mb-4">
        Início » Perfil de {user.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <p className="text-sm text-gray-800">
              "{user.name} é uma pessoa legal, confiável e sexy!"
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm">
                <span>Avalie:</span>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-600">
                    <StarIcon /> <span>confiável ({getRating('confiável')})</span>
                </button>
                 <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                    <SmileyIcon /> <span>legal ({getRating('legal')})</span>
                </button>
                 <button className="flex items-center space-x-1 text-gray-600 hover:text-pink-600">
                    <HeartIcon /> <span>sexy ({getRating('sexy')})</span>
                </button>
            </div>
          </div>
          <Scrapbook scraps={scraps} users={allUsers} />
          <Testimonials testimonials={testimonials} users={allUsers} />
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
           <div className="bg-white border border-gray-300 p-4 rounded-lg">
                <h3 className="text-md text-gray-800 font-bold mb-2">Sobre {user.name}</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                    <li><span className="font-semibold">relacionamento:</span> {user.relationshipStatus}</li>
                    <li><span className="font-semibold">moro:</span> {user.city}, {user.state}</li>
                    <li><span className="font-semibold">país:</span> {user.country}</li>
                </ul>
           </div>
           
           <div className="bg-white border border-gray-300 p-4 rounded-lg">
             <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-md text-gray-800 font-bold">Amigos ({user.friends.length})</h3>
                <a href="#" className="text-blue-600 text-xs hover:underline">ver todos</a>
             </div>
             <div className="grid grid-cols-3 gap-2">
                {friends.slice(0, 9).map(friend => (
                    <div key={friend.id}>
                        <img src={friend.avatarUrl} alt={friend.name} title={friend.name} className="w-full h-auto rounded" />
                        <a href="#" className="text-blue-600 text-xs block truncate hover:underline">{friend.name}</a>
                    </div>
                ))}
             </div>
           </div>

           <div className="bg-white border border-gray-300 p-4 rounded-lg">
             <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-md text-gray-800 font-bold">Comunidades ({user.communities.length})</h3>
                <a href="#" className="text-blue-600 text-xs hover:underline">ver todas</a>
             </div>
             <div className="grid grid-cols-3 gap-2">
                {communities.slice(0, 9).map(community => (
                    <div key={community.id}>
                        <img src={community.imageUrl} alt={community.name} title={community.name} className="w-full h-auto rounded" />
                         <a href="#" className="text-blue-600 text-xs block truncate hover:underline">{community.name}</a>
                    </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
