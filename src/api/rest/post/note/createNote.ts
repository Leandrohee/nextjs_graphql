import axiosInstance from '../../axios';

interface fnCreateNoteArgs {
  title: string;
  content: string;
}

export const fnCreateNote = async ({ title, content }: fnCreateNoteArgs) => {
  try {
    const response = await axiosInstance.post('note/create', {
      title,
      content,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error; ///Re-throw the error so Tanstack Query can catch it
  }
};
