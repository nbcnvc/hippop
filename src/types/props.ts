import { SetStateAction } from 'react';
import { UserInfo } from './types';
import { Store } from './types';

import { Post } from './types';

export interface EditorProps {
  body: string;
  setBody: React.Dispatch<SetStateAction<string>>;
}

// 스토어 지도 props
export interface StoreMapProps {
  storeLocation: string;
}

// 핫플레이스 props
export interface HotPlaceProps {
  guName: string;
}

// 캘린더 props
export interface CalendarProps {
  storeData: Store;
}

export interface SearchCalendarProps {
  storeData: Store[] | any;
  onDateRangeChange: (dates: [Date, Date]) => void;
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
  setPost: React.Dispatch<SetStateAction<Post | null>>;
}

export interface PostsProps {
  setPost: React.Dispatch<SetStateAction<Post | null>>;
}

export interface CommentProps {
  post: Post;
}

export interface DetailProps {
  post: Post;
  setPost: React.Dispatch<SetStateAction<Post | null>>;
}

export interface EditProps {
  post: Post;
  setPost: React.Dispatch<SetStateAction<Post | null>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<SetStateAction<boolean>>;
}

export interface LoginProps {
  onClose: () => void;
  userInfo: UserInfo;
  setUser: React.Dispatch<SetStateAction<UserInfo | null>>;
  closeModal: () => void;
}
