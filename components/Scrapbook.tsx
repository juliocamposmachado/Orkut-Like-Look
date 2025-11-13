
import React from 'react';
import type { Scrap, User } from '../types';
import { BookOpenIcon } from './Icons';

interface ScrapbookProps {
  scraps: Scrap[];
  users: User[];
}

const Scrapbook: React.FC<ScrapbookProps> = ({ scraps, users }) => {
  const findUser = (id: number) => users.find(u => u.id === id);

  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg">
      <h3 className="text-xl text-gray-600 font-normal mb-2"><BookOpenIcon /> Livro de recados</h3>
      <div className="bg-[#f4f4f4] p-3 border-t border-b border-gray-300">
        <p className="text-sm text-gray-700 mb-2">Deixar um recado para Júlio Campos:</p>
        <textarea className="w-full h-16 border border-gray-400 rounded-sm p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
        <div className="flex justify-end mt-2">
            <button className="bg-gray-200 border border-gray-400 text-sm px-4 py-1 rounded-sm">
                enviar
            </button>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {scraps.map(scrap => {
          const author = findUser(scrap.authorId);
          return (
            <div key={scrap.id} className="flex space-x-3">
              <img src={author?.avatarUrl} alt={author?.name} className="w-12 h-12 rounded-full flex-shrink-0" />
              <div>
                <div className="flex items-baseline space-x-2">
                    <h4 className="text-blue-600 font-bold text-sm">{author?.name}</h4>
                    <span className="text-xs text-gray-500">{scrap.timestamp}</span>
                </div>
                <p className="text-sm text-gray-800">{scrap.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scrapbook;
