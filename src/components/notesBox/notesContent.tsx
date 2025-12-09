export default function NotesContent() {
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

  return (
    <div
      className="w-full max-h-[70%] flex flex-col items-center 
      gap-4 overflow-y-scroll mb-20"
    >
      {contentMocked.map((item, index) => (
        <div key={index} className="border w-full rounded-2xl p-3">
          <span className="text-sm font-bold">{item.title}</span>
          <p className="text-sm">{item.content}</p>
        </div>
      ))}
    </div>
  );
}
