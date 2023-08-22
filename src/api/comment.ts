import { supabase } from './supabase';

import { NewCommnet } from '../types/types';

// Comment 추가
export const createComment = async (newComment: NewCommnet) => {
  await supabase.from('comment').insert(newComment);
};
