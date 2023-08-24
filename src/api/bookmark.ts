// 라이브러리
import { supabase } from './supabase';
// 타입
import { Bookmark } from '../types/types';

// 모든 북마크 정보 가져오기
export const fetchAllBookMark = async () => {
  const { data } = await supabase.from('bookmark').select('*');

  return data;
};

// 북마크 토글
export const toggleBookMark = async (bookmark: Bookmark): Promise<void> => {
  const { data: isBookMark }: any = await supabase
    .from('bookmark')
    .select('*')
    .eq('user_id', bookmark.user_id)
    .eq('store_id', bookmark.store_id);

  if (isBookMark.length > 0) {
    await supabase.from('bookmark').delete().eq('user_id', bookmark.user_id).eq('store_id', bookmark.store_id);
  } else {
    await supabase.from('bookmark').insert([{ user_id: bookmark.user_id, store_id: bookmark.store_id }]);
  }
};

// 북마크를 store_id별로 count
export const fetchCount = async (store_id: number) => {
  const { count } = await supabase
    .from('bookmark')
    .select('count', { count: 'exact', head: true })
    .eq('store_id', store_id);

  return count;
};
