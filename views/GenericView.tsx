
import React from 'react';

interface GenericViewProps {
    title: string;
    description: string;
}

export const GenericView: React.FC<GenericViewProps> = ({ title, description }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-3xl font-bold text-orkut-pink mb-4">💙 {title} 💙</h2>
            <p className="text-gray-600">{description}</p>
            <img src={`https://picsum.photos/seed/${title}/500/300`} alt="Placeholder" className="mt-6 rounded-lg mx-auto" />
        </div>
    );
};
