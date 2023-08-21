import { SetStateAction } from 'react';
import { UserInfo } from './types';
import { Store } from './types';

import { Post } from './types';

export interface EditorProps {
  setBody: React.Dispatch<SetStateAction<string>>;
}

// 캘린더 props
export interface CalendarProps {
  storeData: Store;
}
export interface SearchModalProps {
  searchModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
}

export interface WriteProps {
  writeModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
}

export interface PostsProps {
  setPost: React.Dispatch<SetStateAction<Post | null>>;
}

export interface DetailProps {
  post: Post;
  setPost: React.Dispatch<SetStateAction<Post | null>>;
}

export interface LoginProps {
  onClose: () => void;
  userInfo: UserInfo;
  setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
  closeModal: () => void;
}
