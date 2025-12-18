import { CreateNoteDto, CreateNoteResponse } from '../../__generated__/Api';
import axiosInstance from '../../axios';

export const fnCreateNote = async ({
  title,
  content,
}: CreateNoteDto): Promise<CreateNoteResponse> => {
  try {
    const response = await axiosInstance.post<CreateNoteResponse>('note', {
      title,
      content,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error; ///Re-throw the error so Tanstack Query can catch it
  }
};
