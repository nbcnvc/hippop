export interface Store {
  id: number;
  location: string;
  period: number;
  title: string;
  body: string;
  opening: string;
  images: string[];
  link: string;
  latitude: number;
  longitude: number;
}

export interface Post {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  store_id: number;
  category: string;
  title: string;
  body: string;
}

export interface NewPost {
  category: string;
  title: string;
  body: string;
}
