import { SetStateAction } from 'react';

import { Post } from './types';

export interface EditorProps {
  setBody: React.Dispatch<SetStateAction<string>>;
}

export interface WriteProps {
  writeModal: boolean;
  setWriteModal: React.Dispatch<SetStateAction<boolean>>;
}

export interface PostsProps {
  setPost: React.Dispatch<SetStateAction<Post | null>>;
}

export interface DetailProps {
  post: Post;
  setPost: React.Dispatch<SetStateAction<Post | null>>;
}
