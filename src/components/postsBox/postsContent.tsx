'use client';

import { useEffect, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { PostsProps } from '@/api/websocket/hooks/usePostSocket';

interface PostContentProps {
  newPost: PostsProps | null;
}

interface PostsPropsV {
  cod_note: number;
  title: string;
  content: string;
}

export default function PostsContent({ newPost }: PostContentProps) {
  const [posts, setPosts] = useState<PostsPropsV[]>([]);

  const postsMocked = [
    {
      cod_note: 0,
      title: 'banana',
      content: 'banana',
    },
  ];

  useEffect(() => {
    if (!newPost) {
      setPosts(postsMocked);
    } else {
      const newPostsFormated = {
        cod_note: newPost.cod_post,
        title: JSON.stringify(newPost.cod_user),
        content: newPost.content,
      };

      setPosts((prev) => [...prev, newPostsFormated]);
    }
  }, [newPost]);

  return (
    <div
      className="w-full h-[70%] flex flex-col items-center 
      gap-4 overflow-y-scroll mb-20"
    >
      {posts &&
        posts.map((item, index) => (
          <div
            key={index}
            id={JSON.stringify(item.cod_note)}
            className="border w-full rounded-2xl p-3 relative"
          >
            <span className="text-sm font-bold">{item.title}</span>
            <Textarea
              // onChange={(event) => {
              //   handleChangedContentIndex(index);
              //   handleChangedContent(event, item.cod_note);
              // }}
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
