import { create } from 'zustand';

import { UserInfo } from '../types/types';

interface UserState {
  currentUser: UserInfo | null;
  setCurrentUser: (user: UserInfo | null) => void;
}

const tokenKey = localStorage.getItem('user');
const parsedToken = tokenKey ? JSON.parse(tokenKey) : null;

// 현재 유저 set 해주기
export const setUserStore = create<UserState>((set) => ({
  currentUser: parsedToken,
  setCurrentUser: (user) => set({ currentUser: user })
}));

// 유저 정보 가져오기
export const useCurrentUser = () => setUserStore((state) => state.currentUser);
