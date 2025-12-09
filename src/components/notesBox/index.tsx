import NotesContent from './notesContent';
import NotesInput from './notesInput';

export default function NotesBox() {
  return (
    <section className="w-full px-6 py-4 h-full flex flex-col items-center">
      <h2 className="mb-10">Notes</h2>
      <NotesContent></NotesContent>
      <NotesInput></NotesInput>
    </section>
  );
}
