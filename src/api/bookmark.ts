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

// 북마크 카운트
export const fetchCount = async () => {
  const { count } = await supabase.from('bookmark').select('store_id', { count: 'exact', head: true });

  return count;
};
