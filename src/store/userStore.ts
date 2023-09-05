// 라이브러리
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo } from '../types/types';

interface UserState {
  currentUser: UserInfo | null;
  setCurrentUser: (user: UserInfo | null) => void;
}

// 현재 유저 set 해주기
export const setUserStore = create(
  persist<UserState>(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user })
    }),
    {
      name: 'UserStorage'
    }
  )
);

// 유저 정보 가져오기
export const useCurrentUser = () => setUserStore((state) => state.currentUser);
