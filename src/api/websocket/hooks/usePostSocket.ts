'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface PostsProps {
  cod_post: number;
  cod_user: number;
  content: string;
  created_at: Date;
}

export const usePostSocket = () => {
  const [socket, setSocker] = useState<Socket | null>(null);
  const [newPost, setNewPost] = useState<PostsProps | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });

    newSocket.on('connect', () => setIsConnected(true));

    newSocket.on('newPost', (post: PostsProps) => {
      // setNewPost((prev) => [post, ...prev]);
      setNewPost(post);
    });

    setSocker(newSocket);
  }, []);

  return { socket, newPost, isConnected };
};
