
import React from 'react';
import type { User, View } from '../types';

interface SidebarProps {
  user: User;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, setView }) => {
  return (
    <aside className="w-48 flex-shrink-0">
      <div className="bg-white border border-gray-300 p-3 rounded-lg">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-full h-auto border-4 border-white shadow-md"
        />
        <h2 className="text-blue-600 text-lg font-bold mt-2 hover:underline cursor-pointer" onClick={() => setView('profile')}>
          {user.name}
        </h2>
        <p className="text-xs text-gray-500">
          {user.city}, {user.state}
        </p>
        <p className="text-xs text-gray-500">{user.country}</p>
      </div>

      <nav className="mt-4">
        <ul>
          <li className="mb-1">
            <a href="#" onClick={(e) => { e.preventDefault(); setView('profile'); }} className="text-blue-600 text-sm hover:underline">
              <span className="bg-[#e8eef7] text-pink-500 font-bold w-5 h-5 inline-flex items-center justify-center rounded-sm mr-1">
                @
              </span>
              Perfil
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              <span className="bg-[#e8eef7] text-pink-500 font-bold w-5 h-5 inline-flex items-center justify-center rounded-sm mr-1">
                &#9993;
              </span>
              Recados
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="text-blue-600 text-sm hover:underline">
             <span className="bg-[#e8eef7] text-pink-500 font-bold w-5 h-5 inline-flex items-center justify-center rounded-sm mr-1">
                &#128247;
              </span>
              Fotos
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              <span className="bg-[#e8eef7] text-pink-500 font-bold w-5 h-5 inline-flex items-center justify-center rounded-sm mr-1">
                &#127916;
              </span>
              Vídeos
            </a>
          </li>
          <li className="mb-1">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              <span className="bg-[#e8eef7] text-pink-500 font-bold w-5 h-5 inline-flex items-center justify-center rounded-sm mr-1">
                &#127775;
              </span>
              Sorte do Dia
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
