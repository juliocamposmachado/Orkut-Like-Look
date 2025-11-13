
import { User, Post, Community, Recado, Depoimento, Photo } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password',
    name: 'Nostalgic User',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    status: 'online',
    mood: '😊',
    profile: {
      bio: 'Lembrando dos bons tempos da internet. Adoro comunidades e depoimentos!',
      interests: ['Fotografia', 'Música dos anos 2000', 'Games Retrô'],
      music: ['Linkin Park', 'Britney Spears', 'Evanescence'],
      movies: ['O Senhor dos Anéis', 'Matrix', 'Cidade de Deus'],
    },
    friendIds: [2, 3, 4],
  },
  { id: 2, name: 'Amigo Cool', avatar: 'https://picsum.photos/seed/user2/100/100', status: 'online', friendIds: [1], profile: {bio: '', interests: [], music: [], movies: []}, email: '' },
  { id: 3, name: 'Jane Doe', avatar: 'https://picsum.photos/seed/user3/100/100', status: 'offline', friendIds: [1], profile: {bio: '', interests: [], music: [], movies: []}, email: '' },
  { id: 4, name: 'Carlos Silva', avatar: 'https://picsum.photos/seed/user4/100/100', status: 'online', friendIds: [1], profile: {bio: '', interests: [], music: [], movies: []}, email: '' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    authorId: 2,
    text: 'Relembrando o dia que criamos a comunidade "Eu Odeio Acordar Cedo". Bons tempos!',
    imageUrl: 'https://picsum.photos/seed/post1/400/250',
    likes: 15,
    comments: [],
    timestamp: '2024-07-30T10:00:00Z',
  },
  {
    id: 2,
    authorId: 3,
    text: 'Quem mais passava horas customizando o perfil? 🎨',
    likes: 22,
    comments: [],
    timestamp: '2024-07-30T12:30:00Z',
  },
];

export const MOCK_COMMUNITIES: Community[] = [
  { id: 1, name: 'Eu Odeio Acordar Cedo', description: 'Para todos que lutam contra o despertador.', imageUrl: 'https://picsum.photos/seed/comm1/100/100', memberIds: [1, 2, 3] },
  { id: 2, name: 'Discografias em MP3', description: 'Compartilhando raridades musicais.', imageUrl: 'https://picsum.photos/seed/comm2/100/100', memberIds: [1, 2] },
  { id: 3, name: 'Anos 2000 The Best', description: 'Tudo sobre a melhor década.', imageUrl: 'https://picsum.photos/seed/comm3/100/100', memberIds: [1, 3] },
];

export const MOCK_RECADO: Recado[] = [
    { id: 1, authorId: 2, text: 'E aí, sumido! Passando pra deixar um abraço!', timestamp: '2024-07-29T14:00:00Z' },
    { id: 2, authorId: 4, text: 'Adorei suas fotos novas! 📸', timestamp: '2024-07-30T09:15:00Z' },
];

export const MOCK_DEPOIMENTOS: Depoimento[] = [
    { id: 1, authorId: 3, text: 'Pessoa incrível, super de confiança! Te adoro! 💗', status: 'approved', timestamp: '2024-07-28T18:00:00Z' },
    { id: 2, authorId: 4, text: 'Esse aqui é parceiro pra todas as horas. Tamo junto!', status: 'pending', timestamp: '2024-07-30T11:00:00Z' },
];

export const MOCK_PHOTOS: Photo[] = [
    { id: 1, url: 'https://picsum.photos/seed/photo1/500/500', caption: 'Viagem inesquecível!', comments: [] },
    { id: 2, url: 'https://picsum.photos/seed/photo2/500/500', caption: 'Meu pet 🐶', comments: [] },
    { id: 3, url: 'https://picsum.photos/seed/photo3/500/500', caption: 'Formatura!', comments: [] },
];
