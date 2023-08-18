import { SetStateAction } from 'react';

export interface EditorProps {
  setBody: React.Dispatch<SetStateAction<string>>;
}
