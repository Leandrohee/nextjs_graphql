'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { CREATEUSER_MUTATION } from '@/api/graphql/mutations/user/create-user';
import {
  CreateUser_MutationMutation,
  CreateUser_MutationMutationVariables,
} from '@/api/graphql/__generated__/graphql';
import { toast } from 'sonner';

const formSchema = z
  .object({
    email: z.email().nonempty('Email cannot be empty'),
    firstName: z.string().nonempty('First Name cannot be empty'),
    password: z
      .string()
      .min(3, 'Password must be at least 5 characters.')
      .nonempty('Password cannot be empty'),
    confirmPassword: z
      .string()
      .min(3, 'Password must be at least 5 characters.')
      .nonempty('Confirm the password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

interface FormPayload {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
    },
  });
  const [createUser, { data: dataCreateUser }] = useMutation<
    CreateUser_MutationMutation,
    CreateUser_MutationMutationVariables
  >(CREATEUSER_MUTATION);

  const onSubmit = async (payload: FormPayload) => {
    try {
      const response = await createUser({
        variables: {
          email: payload.email,
          firstName: payload.firstName,
          password: payload.password,
        },
      });

      if (!response.data?.createUser) {
        throw new Error('Error to createUser');
      }

      toast.success('User create successfully', {
        style: {
          background: '#79df8d',
        },
        duration: 1000,
      });
      router.push('./');
    } catch (error) {
      console.error(error);
      toast.error('Error to create user', {
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
        <h2 className="mt-3">Register</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-[12px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-[12px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage className="text-[12px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage className="text-[12px]" />
            </FormItem>
          )}
        />
        <Button
          className="w-[50%] bg-blue-600 
          hover:bg-blue-800 hover:cursor-pointer"
        >
          register
        </Button>
      </form>
    </Form>
  );
}
