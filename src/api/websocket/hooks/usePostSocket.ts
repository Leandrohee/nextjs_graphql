'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface PostsProps {
  cod_post: number;
  cod_user: number;
  content: string;
  created_at: Date;
}

export interface PostDeleted {
  cod_post_deleted: number;
  message: string;
}

export const usePostSocket = () => {
  const [socket, setSocker] = useState<Socket | null>(null);
  const [newPost, setNewPost] = useState<PostsProps | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [postDeleted, setPostDeleted] = useState<PostDeleted | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });

    newSocket.on('connect', () => setIsConnected(true));

    newSocket.on('newPost', (post: PostsProps) => {
      setNewPost(post);
    });

    newSocket.on('postDeleted', (postDeleted: PostDeleted) => {
      setPostDeleted(postDeleted);
    });

    setSocker(newSocket);
  }, []);

  return { socket, newPost, isConnected, postDeleted };
};
