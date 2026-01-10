'use client';

import { usePostSocket } from '@/api/websocket/hooks/usePostSocket';
import PostsContent from './postsContent';
import PostsInput from './postsInput';

export default function PostsBox() {
  const { socket, newPost, isConnected } = usePostSocket();

  return (
    <section className="w-full px-6 py-4 h-full flex flex-col items-center">
      <h2 className="mb-10">Posts</h2>
      <PostsContent newPost={newPost} />
      {/* <PostsContent /> */}
      <PostsInput socket={socket} isConnected={isConnected} />
      {/* <PostsInput /> */}
    </section>
  );
}
