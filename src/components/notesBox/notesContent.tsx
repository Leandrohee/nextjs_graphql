'use client';

import { Save, Trash } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { ChangeEvent, useState } from 'react';
import { GetNoteResponse } from '@/api/rest/__generated__/Api';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { fnDeleteNote } from '@/api/rest/delete/note/delete-note';
import { toast } from 'sonner';
import { fnUpdateNote } from '@/api/rest/put/note/update-note';

interface NotesContentProps {
  notes: GetNoteResponse[] | undefined;
  refetchNotes: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<GetNoteResponse[], Error>>;
}

export default function NotesContent({
  notes,
  refetchNotes,
}: NotesContentProps) {
  const [changedContentIndex, setChangedContentIndex] = useState<number[]>([]);
  const [changedContent, setChangedContent] = useState<
    { content: string; cod_note: number }[]
  >([]);
  const { mutateAsync: deleteNote } = useMutation({ mutationFn: fnDeleteNote });
  const { mutateAsync: updateNote } = useMutation({ mutationFn: fnUpdateNote });
  const hoje = new Date().toLocaleDateString();

  const handleChangedContentIndex = (index: number) => {
    if (!changedContentIndex.includes(index)) {
      setChangedContentIndex([...changedContentIndex, index]);
    }
  };

  const handleChangedContent = (
    event: ChangeEvent<HTMLTextAreaElement>,
    cod_note: number
  ) => {
    const newContent = { content: event.target.value, cod_note: cod_note };
    const changedContentWithoutNew = changedContent.filter(
      (item) => item.cod_note !== cod_note
    );

    setChangedContent([...changedContentWithoutNew, newContent]);
  };

  const handleSave = async (index: number, cod_note: number) => {
    try {
      const newContent = changedContent.find(
        (item) => item.cod_note === cod_note
      );

      if (!newContent) {
        throw new Error('Dont have a content');
      }

      const response = await updateNote({
        content: newContent?.content,
        title: hoje,
        cod_note: cod_note,
      });

      if (!response) {
        throw new Error('Error in response');
      }

      toast.success('Note update successfully', {
        style: {
          background: '#79df8d',
        },
        duration: 1000,
      });

      //Retirando as notas editadas dos arrays ChangedContent
      setChangedContentIndex([
        ...changedContentIndex.filter((a) => a !== index),
      ]);
      setChangedContent([
        ...changedContent.filter((b) => b.cod_note !== cod_note),
      ]);
    } catch (error) {
      toast.error('Error at update', {});
    }
  };

  const handleDelete = async (codNote: number) => {
    try {
      const response = await deleteNote({
        cod_note: codNote,
      });
      if (!response) {
        throw new Error('Erro na resposta');
      }

      refetchNotes();

      toast.success('Nota Deletada com sucesso', {
        style: {
          background: '#79df8d',
        },
        duration: 1000,
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message ?? 'Erro ao deletar');
    }
  };

  return (
    <div className="w-full h-[70%] flex flex-col items-center gap-4 overflow-y-scroll mb-20">
      {notes &&
        notes.map((item, index) => (
          <div
            key={index}
            id={JSON.stringify(item.cod_note)}
            className="border w-full rounded-2xl p-3 relative"
          >
            <span className="text-sm font-bold">{item.title}</span>
            <Trash
              className="absolute top-0 right-0 mt-2 mr-2 h-4 
              hover:cursor-pointer text-red-500 hover:text-red-700
              transform scale-100 transition duration-200 ease-in-out hover:scale-125"
              onClick={() => handleDelete(item.cod_note)}
            />
            {changedContentIndex.includes(index) && (
              <Save
                onClick={() => handleSave(index, item.cod_note)}
                color="green"
                className="absolute top-0 right-0 mt-2 mr-8 h-4 
                hover:cursor-pointer text-green-500 hover:text-green-700
                transform scale-100 transition duration-200 ease-in-out hover:scale-125"
              />
            )}
            <Textarea
              onChange={(event) => {
                handleChangedContentIndex(index);
                handleChangedContent(event, item.cod_note);
              }}
              className="text-sm border-0 shadow-none p-0 resize-none"
              defaultValue={item.content}
            ></Textarea>
          </div>
        ))}
    </div>
  );
}
