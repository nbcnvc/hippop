import { useQuery } from '@tanstack/react-query';

import { CommentCountProps } from '../../../../types/props';
import { getCommentCount } from '../../../../api/comment';

const CommentCount = ({ postId }: CommentCountProps) => {
  const { data } = useQuery(['commentcount', postId], () => getCommentCount(postId));
  return <div>{data}</div>;
};

export default CommentCount;
