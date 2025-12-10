import axiosInstance from '../../axios';

export interface UpdateNoteArgs {
  codNote: number;
  title: string;
  content: string;
}

export const fnUpdateNote = async (args: UpdateNoteArgs) => {
  try {
    const response = await axiosInstance.put('note/update', {
      title: args.title,
      content: args.content,
      codNote: args.codNote,
    });

    return response.data;
  } catch (error) {
    throw error; ///Re-throw the error so Tanstack Query can catch it
  }
};
