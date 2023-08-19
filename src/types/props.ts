import { SetStateAction } from 'react';

export interface EditorProps {
  setBody: React.Dispatch<SetStateAction<string>>;
}

export interface WriteProps {
  writeModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
}
