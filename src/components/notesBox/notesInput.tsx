'use client';

import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { fnCreateNote } from '@/api/rest/post/note/create-note';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

const formSchema = z.object({
  content: z.string().min(1, 'Content has to be at least 1 character'),
});

interface PayloadProps {
  content: string;
}

export default function NotesInput() {
  const { mutateAsync: createNote } = useMutation({ mutationFn: fnCreateNote });
  const hoje = new Date().toLocaleDateString();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const sendNote = async (payload: PayloadProps) => {
    try {
      const response = await createNote({
        content: payload.content,
        title: hoje,
      });
      if (!response) {
        throw new Error('Erro na resposta');
      }
      toast.success('Nota criada com sucesso', {
        style: {
          background: '#79df8d',
        },
        duration: 1000,
      });
      form.resetField('content');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao criar nova nota');
    }
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor="message">New note</Label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendNote)}
          className="flex flex-col w-full gap-2"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Type a new note here."
                    className=" border-zinc-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>
    </div>
  );
}
