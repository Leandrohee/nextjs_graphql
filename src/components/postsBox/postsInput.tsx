'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Socket } from 'socket.io-client';

/* ----------------------------------------- zend config ---------------------------------------- */
const formSchema = z.object({
  content: z.string().min(1, 'Content has to be at least 1 character'),
});

/* ----------------------------------------- interfaces ----------------------------------------- */
interface PayloadProps {
  content: string;
}

interface PostsInputProps {
  socket: Socket | null;
  isConnected: boolean;
}

export default function PostsInput({ socket, isConnected }: PostsInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const sendPost = (payload: PayloadProps) => {
    socket?.emit('createPost', payload);

    form.reset();
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <Label className="my-auto" htmlFor="message">
        New post
      </Label>

      {/* Connection status indicator */}
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className="text-xs text-gray-500">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendPost)}
          className="flex flex-col w-full gap-2"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Type a new post here."
                    className=" border-zinc-500"
                    // disabled={!connected}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            // disabled={!connected || form.formState.isSubmitting}
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}
