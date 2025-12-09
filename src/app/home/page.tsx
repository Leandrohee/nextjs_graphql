import NotesBox from '@/components/notesBox';

export default function Home() {
  return (
    <div className="w-full h-full flex justify-around items-center">
      <div
        className="w-[48%] h-[90%] bg-blue-50 rounded-4xl shadow-2xl 
        flex justify-center"
      >
        <NotesBox />
      </div>
      <div
        className="w-[48%] h-[90%] bg-green-50 rounded-4xl shadow-2xl 
        flex justify-center"
      >
        Posts
      </div>
    </div>
  );
}
