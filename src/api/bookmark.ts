// 라이브러리
import { supabase } from './supabase';
// 타입
import { Bookmark } from '../types/types';

// 모든 북마크 정보 가져오기
export const fetchAllBookMark = async () => {
  const { data } = await supabase.from('bookmark').select('*');

  return data;
};

// 북마크 토글 기능
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

// // 북마크 추가
// export const createBookMark = async (toggleBookMark: Bookmark): Promise<void> => {
//   await supabase.from('bookmark').insert(toggleBookMark);
// };

// // 북마크 삭제
// export const deleteBookMark = async (bookmarkId: number): Promise<void> => {
//   // bookmark 테이블에서 id가 bookmarkId인 행을 삭제
//   await supabase.from('bookmark').delete().eq('id', bookmarkId);
// };
