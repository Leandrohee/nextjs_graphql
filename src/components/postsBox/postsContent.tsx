'use client';

import { useEffect, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { PostDeleted, PostsProps } from '@/api/websocket/hooks/usePostSocket';
import { useQuery } from '@tanstack/react-query';
import { GetPostResponse } from '@/api/rest/__generated__/Api';
import { Trash } from 'lucide-react';
import { Socket } from 'socket.io-client';

interface PostContentProps {
  newPost: PostsProps | null;
  dPosts: GetPostResponse[] | undefined;
  postDeleted: PostDeleted | null;
  socket: Socket | null;
}

interface PostsPropsV {
  cod_post: number;
  title: string;
  content: string;
}

export default function PostsContent({
  dPosts,
  newPost,
  postDeleted,
  socket,
}: PostContentProps) {
  const [posts, setPosts] = useState<PostsPropsV[]>([]);

  //When a new post is comming or being deleted
  useEffect(() => {
    if (!newPost && dPosts) {
      const dPostsFormat = dPosts.map((item) => {
        return {
          cod_post: item.cod_post,
          title: JSON.stringify(item.cod_user),
          content: item.content,
        };
      });

      setPosts(dPostsFormat);
    } else if (newPost) {
      const newPostsFormated = {
        cod_post: newPost.cod_post,
        title: JSON.stringify(newPost.cod_user),
        content: newPost.content,
      };

      setPosts((prev) => [...prev, newPostsFormated]);
    }

    if (postDeleted) {
      const postUpdated = posts.filter(
        (item) => item.cod_post !== postDeleted.cod_post_deleted
      );

      setPosts(postUpdated);
    }
  }, [newPost, dPosts, postDeleted]);

  const handleDelete = (cod_post: number) => {
    socket?.emit('deletePost', { cod_post: cod_post });
  };

  return (
    <div
      className="w-full h-[70%] flex flex-col items-center 
      gap-4 overflow-y-scroll mb-20"
    >
      {posts &&
        posts.map((item, index) => (
          <div
            key={index}
            id={JSON.stringify(item.cod_post)}
            className="border w-full rounded-2xl p-3 relative"
          >
            <span className="text-sm font-bold">{item.title}</span>
            <Trash
              className="absolute top-0 right-0 mt-2 mr-2 h-4 
              hover:cursor-pointer text-red-500 hover:text-red-700
              transform scale-100 transition duration-200 ease-in-out hover:scale-125"
              onClick={() => handleDelete(item.cod_post)}
            />
            <Textarea
              className="text-sm border-0 shadow-none p-0 resize-none 
                focus-visible:ring-0 focus-visible:ring-offset-0"
              defaultValue={item.content}
              readOnly
            ></Textarea>
          </div>
        ))}
    </div>
  );
}
