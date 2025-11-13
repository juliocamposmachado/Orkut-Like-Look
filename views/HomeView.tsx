
import React, { useEffect, useState } from 'react';
import { Post as PostType, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { getPostsForUserFeed, getUserById } from '../services/storageService';

const PostCard: React.FC<{ post: PostType }> = ({ post }) => {
    const [author, setAuthor] = useState<User | null>(null);

    useEffect(() => {
        const user = getUserById(post.authorId);
        if (user) {
            setAuthor(user);
        }
    }, [post.authorId]);

    if (!author) return null;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-3">
                <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-bold text-orkut-text">{author.name}</p>
                    <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                </div>
            </div>
            <p className="text-gray-800 mb-3">{post.text}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="rounded-lg w-full" />}
            <div className="flex justify-end space-x-4 mt-3 text-sm">
                <button className="text-orkut-pink hover:underline">Curtir 💗</button>
                <button className="text-orkut-text hover:underline">Comentar 💬</button>
            </div>
        </div>
    );
};

export const HomeView: React.FC = () => {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        if (currentUser) {
            setPosts(getPostsForUserFeed(currentUser.id));
        }
    }, [currentUser]);

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <textarea className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orkut-pink" rows={3} placeholder={`No que você está pensando, ${currentUser?.name}?`}></textarea>
                <div className="flex justify-end mt-2">
                    <button className="bg-orkut-pink text-white px-4 py-1 rounded-2xl text-sm font-semibold">Postar</button>
                </div>
            </div>
            <div>
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
    );
};
