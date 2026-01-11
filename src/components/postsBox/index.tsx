'use client';

import { usePostSocket } from '@/api/websocket/hooks/usePostSocket';
import PostsContent from './postsContent';
import PostsInput from './postsInput';
import { useQuery } from '@tanstack/react-query';
import { fnGetPost } from '@/api/rest/get/post/get-post';

export default function PostsBox() {
  const { socket, newPost, isConnected, postDeleted } = usePostSocket();
  const { data: dPosts } = useQuery({
    queryKey: ['getPost'],
    queryFn: fnGetPost,
  });

  return (
    <section className="w-full px-6 py-4 h-full flex flex-col items-center">
      <h2 className="mb-10">Posts</h2>
      <PostsContent
        dPosts={dPosts}
        newPost={newPost}
        postDeleted={postDeleted}
        socket={socket}
      />
      <PostsInput socket={socket} isConnected={isConnected} />
    </section>
  );
}
