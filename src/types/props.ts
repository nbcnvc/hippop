import { SetStateAction } from 'react';
import { UserInfo, Store, Post, HotPlaceInfo } from './types';

export interface EditorProps {
  body: string;
  setBody: React.Dispatch<SetStateAction<string>>;
}

// 스토어 지도 props
export interface StoreMapProps {
  storeLocation: string;
}

// 주변 지역 팝업스토어 props
export interface NearbyStoreProps {
  guName: string;
  setIsShowSMarker: React.Dispatch<SetStateAction<boolean>>;
}

// 핫플레이스 props
export interface HotPlaceProps {
  setCategory: React.Dispatch<SetStateAction<string>>;
  setIsShowPMarker: React.Dispatch<SetStateAction<boolean>>;
  searchData: HotPlaceInfo[];
}

// 캘린더 props
export interface CalendarProps {
  storeData: Store;
}

export interface SearchCalendarProps {
  storeData: Store[] | null;
  onSearch: (startDate: Date, endDate: Date) => void;
}

export interface SearchModalProps {
  searchModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
  setId: React.Dispatch<SetStateAction<number>>;
  setTitle: React.Dispatch<SetStateAction<string>>;
  result: Store[] | null;
  setResult: React.Dispatch<SetStateAction<Store[] | null>>;
}

export interface WriteProps {
  writeModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
  setSearchModal: React.Dispatch<SetStateAction<boolean>>;
  storeId: number;
  storeTitle: string;
  setResult: React.Dispatch<SetStateAction<Store[] | null>>;
}

export interface PostsProps {
  setPost: React.Dispatch<SetStateAction<Post | null>>;
}

export interface CommentProps {
  post: Post;
}

export interface WriterProps {
  userId: string;
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
