import { GetNoteResponse } from '../../__generated__/Api';
import axiosInstance from '../../axios';

export const fnGetNote = async (): Promise<GetNoteResponse[]> => {
  try {
    const response = await axiosInstance.get<GetNoteResponse[]>('note');
    return response.data;
  } catch (error) {
    throw error;
  }
};
