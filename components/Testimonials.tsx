
import React from 'react';
import type { Testimonial, User } from '../types';
import { HeartIconPink } from './Icons';

interface TestimonialsProps {
  testimonials: Testimonial[];
  users: User[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, users }) => {
    const findUser = (id: number) => users.find(u => u.id === id);

    return (
        <div className="bg-white border border-gray-300 p-4 rounded-lg">
            <h3 className="text-xl text-gray-600 font-normal mb-2"><HeartIconPink /> Depoimentos</h3>
            <div className="space-y-4">
                {testimonials.map(testimonial => {
                    const author = findUser(testimonial.authorId);
                    return (
                        <div key={testimonial.id} className="flex space-x-3 p-3 bg-gray-50 rounded-md">
                             <img src={author?.avatarUrl} alt={author?.name} className="w-12 h-12 rounded-full flex-shrink-0" />
                            <div>
                                <div className="flex items-baseline space-x-2">
                                    <h4 className="text-blue-600 font-bold text-sm">{author?.name}</h4>
                                    <span className="text-xs text-gray-500">diz:</span>
                                </div>
                                <blockquote className="text-sm text-gray-800 italic border-l-2 border-gray-300 pl-2 mt-1">
                                    {testimonial.content}
                                </blockquote>
                                <span className="text-xs text-gray-500 mt-1 block">{testimonial.timestamp}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Testimonials;
