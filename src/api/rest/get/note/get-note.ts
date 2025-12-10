import axiosInstance from '../../axios';

export const fnGetNote = async () => {
  try {
    const response = await axiosInstance.get('note/get');
    return response.data;
  } catch (error) {
    throw error;
  }
};
