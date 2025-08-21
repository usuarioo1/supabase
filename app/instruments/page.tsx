import { createClient } from '@/lib/supabase/server';

interface Instrument {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
}

export default async function Instruments() {
    const supabase = await createClient();
    const { data: instruments } = await supabase
        .from("instruments")
        .select() as unknown as { data: Instrument[] };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Instrumentos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instruments?.map((instrument: Instrument) => (
                    <div key={instrument.id} className="p-4 border rounded-lg shadow bg-card">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold">{instrument.name || 'Sin nombre'}</h2>
                            {instrument.description && (
                                <p className="text-sm text-gray-600">{instrument.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {(!instruments || instruments.length === 0) && (
                <p className="text-center text-gray-500 mt-4">
                    No hay instrumentos registrados
                </p>
            )}
        </div>
    );
}