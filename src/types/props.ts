import { SetStateAction } from 'react';
import { UserInfo } from './types';

export interface EditorProps {
  setBody: React.Dispatch<SetStateAction<string>>;
}

export interface WriteProps {
  writeModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
}

export interface LoginProps {
  onClose: () => void;
  userInfo: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  closeModal: () => void;
}
