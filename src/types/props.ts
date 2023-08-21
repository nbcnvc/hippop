import { SetStateAction } from 'react';
import { Store } from './types';

export interface EditorProps {
  setBody: React.Dispatch<SetStateAction<string>>;
}

// 캘린더 props
export interface CalendarProps {
  storeData: Store;
}
