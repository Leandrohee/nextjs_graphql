'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { fnCreateNote } from '@/api/rest/post/note/createNote';
import { toast } from 'sonner';

export default function NotesInput() {
  const [textContent, setTextContent] = useState('');
  const { mutateAsync: createNote } = useMutation({ mutationFn: fnCreateNote });
  const hoje = new Date().toLocaleDateString();

  const sendNote = async () => {
    try {
      const response = await createNote({
        content: textContent,
        title: hoje,
      });

      if (!response) {
        throw new Error('Erro na resposta');
      }

      toast.success('Nota criada com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao criar nova nota');
    }
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor="message">New note</Label>
      <Textarea
        placeholder="Type a new note here."
        className=" border-zinc-500"
        value={textContent}
        onChange={(event) => setTextContent(event.target.value)}
      />
      <Button onClick={sendNote}>Send</Button>
    </div>
  );
}
