import { GetPostResponse } from '../../__generated__/Api';
import axiosInstance from '../../axios';

export const fnGetPost = async (): Promise<GetPostResponse[]> => {
  try {
    const response = await axiosInstance.get<GetPostResponse[]>('post');
    return response.data;
  } catch (error) {
    throw error;
  }
};
