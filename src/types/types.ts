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
  isclosed: boolean;
  reservation: boolean;
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

export interface SearchListProps {
  storeData: Store[];
}

export interface PostType {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  store_id: number;
  ctg_index: number;
  title: string;
  body: any;
  isdeleted: boolean;
  store: { title: string };
}

export interface NewPost {
  user_id: string | undefined;
  store_id: number;
  ctg_index: number;
  title: string;
  body: string;
}

export interface UpdatePost {
  id: number;
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
  isdeleted: boolean;
}

export interface NewComment {
  user_id: string | undefined;
  post_id: number;
  body: string;
}

export interface UserInfo {
  id: string | undefined;
  created_at: string | undefined;
  email: string | undefined;
  name: string | undefined;
  avatar_url: string | undefined;
}

export interface User extends SupabaseUser {
  avatar_url: string;
  name: string;
}

export interface FetchsStore {
  stores: Store[];
  page: number;
  totalPages: number;
  count: number | null;
}

export interface FetchPost {
  posts: any;
  page: number;
  totalPages: number;
  count: number | null;
}

export interface FetchComment {
  comments: Comment[];
  page: number;
  totalPages: number;
  count: number | null;
}

export interface SubscribeType {
  subscribe_from: string | undefined;
  subscribe_to: string | undefined;
}

export interface AlarmType {
  id: number;
  created_at: string;
  targetUserId: string;
  content: string;
  isRead: boolean;
  post_id: number | null;
  sub_from: string | null;
  ctg_index: number;
}

export interface Geocoder {
  address: AddressInfo;
  address_name: string;
  address_type: string;
  road_address: RoadAddress;
  x: string;
  y: string;
}

export interface AddressInfo {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
}

export interface RoadAddress {
  address_name: string;
  building_name: string;
  main_building_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  x: string;
  y: string;
  zone_no: string;
}

export interface HotPlaceInfo {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface MessageType {
  sender: string;
  receiver: string;
  body: string;
  isRead: boolean;
  isSender: boolean;
  isReceiver: boolean;

  from: UserMsgType;
  to: UserMsgType;
  id: number;
  created_at: string;
}

export interface UserMsgType {
  avatar_url?: string;
  name?: string;
}

export interface ReviewProps {
  selectItems: PostType[];
}

export interface SliderButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
