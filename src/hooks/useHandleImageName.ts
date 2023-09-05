// 라이브러리
import { v4 as uuidv4 } from 'uuid';

export const randomFileName = (originalFileName: string): string => {
  const fileExtension = originalFileName.split('.').pop();
  const randomFileName = uuidv4() + '.' + (fileExtension || 'jpg');
  return randomFileName;
};
