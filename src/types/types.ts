import { User as SupabaseUser } from '@supabase/supabase-js';

export interface Store {
  id: number;
  location: string;
  period_start: string;
  period_end: string;
  title: string;
  body: string;
  opening: string;
  images: string[];
  link: string;
  latitude: number;
  longitude: number;
}

// Kakao 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

export interface Bookmark {
  user_id: string;
  store_id: number;
}

export interface Post {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  store_id: number;
  title: string;
  body: string;
  ctg_index: number;
  isDeleted: boolean;
}

export interface NewPost {
  // user_id: string;
  // store_id: number;
  ctg_index: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  post_id: number;
  body: string;
  isDeleted: boolean;
}

export interface NewCommnet {
  // user_id: string;
  post_id: number;
  body: string;
}

export interface UserInfo {
  avatar_url: string;
  name: string;
}

export interface User extends SupabaseUser {
  avatar_url: string;
  name: string;
}

export interface FetchData {
  posts: Post[];
  page: number;
  totalPages: number;
  count: number | null;
}
