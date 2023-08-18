import { v4 as uuidv4 } from 'uuid';

export const handleImageChange = (selectedFiles: FileList): File[] => {
  const updatedSelectedImages: File[] = [];

  for (let i = 0; i < selectedFiles.length; i++) {
    const selectedFile = selectedFiles[i];
    const originalFileName = selectedFile.name;
    const fileExtension = originalFileName.split('.').pop();
    const randomFileName = uuidv4() + '.' + (fileExtension || 'jpg');

    updatedSelectedImages.push(new File([selectedFile], randomFileName));
  }

  return updatedSelectedImages;
};
