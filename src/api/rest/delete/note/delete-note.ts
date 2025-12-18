import { DeleteNoteDto, DeleteNoteResponse } from '../../__generated__/Api';
import axiosInstance from '../../axios';

export const fnDeleteNote = async ({
  cod_note,
}: DeleteNoteDto): Promise<DeleteNoteResponse> => {
  try {
    const response = await axiosInstance.delete<DeleteNoteResponse>('note', {
      data: {
        cod_note,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error; //Re-throw the error so Tanstack Query can catch it
  }
};
