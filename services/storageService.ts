
import { User, Post, Community, Recado, Depoimento, Photo } from '../types';
import { MOCK_USERS, MOCK_POSTS, MOCK_COMMUNITIES, MOCK_RECADO, MOCK_DEPOIMENTOS, MOCK_PHOTOS } from '../data/mockData';

const USERS_KEY = 'orkut_users';
const POSTS_KEY = 'orkut_posts';
const COMMUNITIES_KEY = 'orkut_communities';
const RECADO_KEY = 'orkut_recados';
const DEPOIMENTOS_KEY = 'orkut_depoimentos';
const PHOTOS_KEY = 'orkut_photos';
const LOGGED_IN_USER_KEY = 'orkut_logged_in_user';

export const initializeData = (): void => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(MOCK_USERS));
  }
  if (!localStorage.getItem(POSTS_KEY)) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(MOCK_POSTS));
  }
  if (!localStorage.getItem(COMMUNITIES_KEY)) {
    localStorage.setItem(COMMUNITIES_KEY, JSON.stringify(MOCK_COMMUNITIES));
  }
  if (!localStorage.getItem(RECADO_KEY)) {
    localStorage.setItem(RECADO_KEY, JSON.stringify(MOCK_RECADO));
  }
  if (!localStorage.getItem(DEPOIMENTOS_KEY)) {
    localStorage.setItem(DEPOIMENTOS_KEY, JSON.stringify(MOCK_DEPOIMENTOS));
  }
   if (!localStorage.getItem(PHOTOS_KEY)) {
    localStorage.setItem(PHOTOS_KEY, JSON.stringify(MOCK_PHOTOS));
  }
};

// User Functions
export const getUsers = (): User[] => JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
export const getUserById = (id: number): User | undefined => getUsers().find(u => u.id === id);
export const getUserByEmail = (email: string): User | undefined => getUsers().find(u => u.email === email);
export const addUser = (user: Omit<User, 'id'>): User => {
  const users = getUsers();
  const newUser: User = { ...user, id: Date.now(), friendIds: [] };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

// Auth Functions
export const setLoggedInUser = (user: User): void => localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
export const getLoggedInUser = (): User | null => {
  const userJson = localStorage.getItem(LOGGED_IN_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};
export const logoutUser = (): void => localStorage.removeItem(LOGGED_IN_USER_KEY);

// Post Functions
export const getPosts = (): Post[] => JSON.parse(localStorage.getItem(POSTS_KEY) || '[]');
export const getPostsForUserFeed = (userId: number): Post[] => {
  const user = getUserById(userId);
  if (!user) return [];
  const friendIds = user.friendIds;
  return getPosts().filter(post => friendIds.includes(post.authorId) || post.authorId === userId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Community Functions
export const getCommunities = (): Community[] => JSON.parse(localStorage.getItem(COMMUNITIES_KEY) || '[]');
export const getPopularCommunities = (): Community[] => getCommunities().slice(0, 3);

// Other Data
export const getRecados = (): Recado[] => JSON.parse(localStorage.getItem(RECADO_KEY) || '[]');
export const getDepoimentos = (): Depoimento[] => JSON.parse(localStorage.getItem(DEPOIMENTOS_KEY) || '[]');
export const getPhotos = (): Photo[] => JSON.parse(localStorage.getItem(PHOTOS_KEY) || '[]');
