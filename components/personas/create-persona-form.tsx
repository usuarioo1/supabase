'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CreatePersonaForm() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [ocupacion, setOcupacion] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase
                .from('personas')
                .insert([{ nombre, email, ocupacion }])

            if (error) throw error

            // Limpiar el formulario
            setNombre('')
            setEmail('')
            setOcupacion('')
            
            // Recargar la página para mostrar los nuevos datos
            window.location.reload()
        } catch (error) {
            console.error('Error:', error)
            alert('Error al guardar los datos')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder="Ingrese el nombre"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Ingrese el email"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="ocupacion">Ocupación</Label>
                <Input
                    id="ocupacion"
                    type="text"
                    value={ocupacion}
                    onChange={(e) => setOcupacion(e.target.value)}
                    required
                    placeholder="Ingrese la ocupación"
                />
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Persona'}
            </Button>
        </form>
    )
}