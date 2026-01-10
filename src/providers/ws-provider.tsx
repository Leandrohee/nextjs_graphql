/**
 *
 * This file is for the websocket logic to provide for the whole project
 *
 */

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface Post {
  cod_post: number;
  cod_user: number;
  content: string;
  created_at: Date;
}

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  posts: Post[];
  createPost: (content: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  posts: [],
  createPost: () => {},
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Get token from cookie or localStorage
    // const token = document.cookie
    //   .split('; ')
    //   .find(row => row.startsWith('access_token='))
    //   ?.split('=')[1];

    // if (!token) {
    //   console.error('No access token found');
    //   return;
    // }

    // Create socket connection
    const newSocket = io('http://localhost:3001', {
      withCredentials: true, // Send cookies
      transports: ['websocket', 'polling'],
    });

    // Connection handlers
    newSocket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket');
      setConnected(false);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Listen for new posts from any user
    newSocket.on('newPost', (post: Post) => {
      console.log('📨 New post received:', post);
      setPosts((prev) => [post, ...prev]); // Add new post to the beginning
    });

    // Listen for post creation confirmation
    newSocket.on('postCreated', (post: Post) => {
      console.log('✅ Your post was created:', post);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const createPost = (content: string) => {
    if (!socket || !connected) {
      console.error('Socket not connected');
      return;
    }

    socket.emit('createPost', { content }, (response: any) => {
      // This callback receives the return value from the backend
      if (response.event === 'error') {
        console.error('Failed to create post:', response.data);
      } else {
        console.log('Post created successfully:', response.data);
      }
    });
  };

  return (
    <SocketContext.Provider value={{ socket, connected, posts, createPost }}>
      {children}
    </SocketContext.Provider>
  );
}
