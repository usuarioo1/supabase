import { createClient } from "@/lib/supabase/server";

interface Note {
  id: number;
  title: string;
}

export default async function NotesPage() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from('notes').select('id, title');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Notas</h1>
      <div className="grid gap-4">
        {notes?.map((note: Note) => (
          <div key={note.id} className="p-4 border rounded-lg shadow bg-card">
            <p className="text-lg">{note.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
