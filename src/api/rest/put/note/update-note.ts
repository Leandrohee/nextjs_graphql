import { UpdateNoteDto, UpdateNoteResponse } from '../../__generated__/Api';
import axiosInstance from '../../axios';

export const fnUpdateNote = async ({
  cod_note,
  content,
  title,
}: UpdateNoteDto): Promise<UpdateNoteResponse> => {
  try {
    const response = await axiosInstance.put<UpdateNoteResponse>('note', {
      cod_note,
      content,
      title,
    });

    return response.data;
  } catch (error) {
    throw error; ///Re-throw the error so Tanstack Query can catch it
  }
};
