import NotesBox from '@/components/notesBox';
import PostsBox from '@/components/postsBox';

export default function Home() {
  return (
    <div className="w-full h-full flex justify-around items-start">
      <div
        className="w-[48%] h-full bg-blue-50 rounded-4xl shadow-2xl 
        flex justify-center"
      >
        <NotesBox />
      </div>
      <div
        className="w-[48%] h-full bg-green-50 rounded-4xl shadow-2xl 
        flex justify-center"
      >
        <PostsBox />
      </div>
    </div>
  );
}
