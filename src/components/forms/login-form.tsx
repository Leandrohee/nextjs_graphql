'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useLazyQuery } from '@apollo/client/react';
import { SIGNIN_QUERY } from '@/api/graphql/queries/user/graphql';
import {
  SignIn_QueryQuery,
  SignIn_QueryQueryVariables,
} from '@/api/graphql/__generated__/graphql';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface FormPayload {
  email: string;
  password: string;
}

/* --------------------------------------- ZOD VALIDATION --------------------------------------- */
const zodValidation = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(2, 'The passowrd has to be at lest 2 characters'),
});

/* ------------------------------------------ COMPONENT ----------------------------------------- */
export default function LoginForm() {
  const form = useForm<z.infer<typeof zodValidation>>({
    resolver: zodResolver(zodValidation),
  });
  const router = useRouter();

  const [fnSignIn, { data: dataSignIn }] = useLazyQuery<
    SignIn_QueryQuery,
    SignIn_QueryQueryVariables
  >(SIGNIN_QUERY);

  const onSubmit = async (payload: FormPayload) => {
    try {
      const res = await fnSignIn({
        variables: {
          email: payload.email,
          password: payload.password,
        },
      });

      const message = res.data?.signIn.message;
      if (!message) {
        throw new Error('No token found!');
      }

      toast.success('User loged in successfully', {
        style: {
          background: '#79df8d',
        },
        duration: 1000,
      });

      // Litle delay to toast to appear
      router.push('/home');
    } catch (error: any) {
      console.error(error);

      toast.error(error?.message, {
        style: {
          background: '#fecaca',
          font: 'bold',
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" min-w-[40%] min-h-[60%] bg-white py-6 px-14 
        rounded-4xl shadow-2xl flex items-center flex-col gap-5"
      >
        <h3 className="mt-20">Login</h3>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-[50%] hover:cursor-pointer" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
