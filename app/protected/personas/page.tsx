import { createClient } from "@/lib/supabase/server";
import { CreatePersonaForm } from '@/components/personas/create-persona-form';

interface Persona {
    id: number;
    nombre: string;
    email: string;
    ocupacion: string;
}

export default async function PersonasPage() {
    const supabase = await createClient();
    const { data: personas, error } = await supabase
        .from('personas')
        .select('id, nombre, email, ocupacion');

    if (error) {
        console.error('Error:', error);
        return (
            <div className="container mx-auto p-4">
                <p className="text-red-500">Error al cargar los datos</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Lista de Personas</h1>
            <div className="bg-card p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Agregar Nueva Persona</h2>
                <CreatePersonaForm />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {personas?.map((persona: Persona) => (
                    <div key={persona.id} className="p-4 border rounded-lg shadow bg-card hover:shadow-lg transition-shadow">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold">
                                {persona.nombre}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Email: {persona.email}
                            </p>
                            <p className="text-sm text-gray-600">
                                Ocupación: {persona.ocupacion}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {personas?.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                    No hay personas registradas aún
                </p>
            )}
        </div>
    );
}
