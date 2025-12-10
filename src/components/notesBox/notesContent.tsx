'use client';

import { Save, Trash } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fnGetNote } from '@/api/rest/get/note/get-note';

export default function NotesContent() {
  const [changedContent, setChangedContent] = useState<number[]>([]);
  const { data: dNotes, refetch: refecthNotes } = useQuery({
    queryKey: ['getNote'],
    queryFn: fnGetNote,
  });

  dNotes && console.log(dNotes);

  const contentMocked = [
    {
      title: 'Title 1',
      content: 'content 1',
    },
    {
      title: 'Title 2',
      content: 'content 2',
    },
    {
      title: 'Title 3',
      content: 'content 3',
    },
    {
      title: 'Title 4',
      content: 'content 3',
    },
    {
      title: 'Title 5',
      content:
        ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    },
    {
      title: 'Title 6',
      content:
        ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    },
  ];

  const handleChangedContent = (index: number) => {
    if (!changedContent.includes(index)) {
      setChangedContent([...changedContent, index]);
    }
  };

  const handleSave = (index: number) => {
    setChangedContent([...changedContent.filter((a) => a !== index)]);
  };

  console.log(changedContent);
  return (
    <div
      className="w-full max-h-[70%] flex flex-col items-center 
      gap-4 overflow-y-scroll mb-20"
    >
      {dNotes &&
        dNotes.map((item, index) => (
          <div key={index} className="border w-full rounded-2xl p-3 relative">
            <span className="text-sm font-bold">{item.title}</span>
            <Trash
              className="absolute top-0 right-0 mt-2 mr-2 h-4 
              hover:cursor-pointer text-red-500 hover:text-red-700
              transform scale-100 transition duration-200 ease-in-out hover:scale-125"
            />
            {changedContent.includes(index) && (
              <Save
                onClick={() => handleSave(index)}
                color="green"
                className="absolute top-0 right-0 mt-2 mr-8 h-4 
                hover:cursor-pointer text-green-500 hover:text-green-700
                transform scale-100 transition duration-200 ease-in-out hover:scale-125"
              />
            )}
            <Textarea
              onChange={() => {
                handleChangedContent(index);
              }}
              className="text-sm border-0 shadow-none p-0 resize-none"
            >
              {item.content}
            </Textarea>
          </div>
        ))}
    </div>
  );
}
