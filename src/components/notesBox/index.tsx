'use client';

import { fnGetNote } from '@/api/rest/get/note/get-note';
import NotesContent from './notesContent';
import NotesInput from './notesInput';
import { useQuery } from '@tanstack/react-query';

export default function NotesBox() {
  const { data: dNotes, refetch: refecthNotes } = useQuery({
    queryKey: ['getNote'],
    queryFn: fnGetNote,
  });

  return (
    <section className="w-full px-6 py-4 h-full flex flex-col items-center">
      <h2 className="mb-10">Notes</h2>
      <NotesContent notes={dNotes} refetchNotes={refecthNotes} />
      <NotesInput refetchNotes={refecthNotes} />
    </section>
  );
}
