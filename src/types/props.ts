import { SetStateAction } from 'react';

export interface EditorProps {
  setBody: React.Dispatch<SetStateAction<string>>;
}

export interface StoreMapProps {
  storeLocation: string;
}

export interface HotPlaceProps {
  roadName: string;
}
