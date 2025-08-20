# Implementación de CRUD con Supabase

Este documento detalla cómo se implementa el CRUD (Create, Read, Update, Delete) en este proyecto usando Supabase y Next.js.

## Configuración Inicial

### 1. Variables de Entorno
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_anon_key
```

### 2. Clientes de Supabase

#### Cliente del Navegador (Components)
```typescript
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
```

#### Cliente del Servidor (Server Components)
```typescript
import { createClient } from "@/lib/supabase/server"

const supabase = await createClient()
```

## Operaciones CRUD

### 1. Crear (Create)

Ejemplo de creación de una persona:
```typescript
const { error } = await supabase
  .from('personas')
  .insert([{
    nombre: 'Juan',
    email: 'juan@ejemplo.com',
    ocupacion: 'Desarrollador'
  }])
```

Implementación en un formulario:
```typescript
'use client'
export function CreatePersonaForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        ocupacion: ''
    })
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const { error } = await supabase
            .from('personas')
            .insert([formData])
    }
    
    return (
        <form onSubmit={handleSubmit}>
            {/* Campos del formulario */}
        </form>
    )
}
```

### 2. Leer (Read)

Obtener todas las personas:
```typescript
const { data: personas, error } = await supabase
  .from('personas')
  .select('id, nombre, email, ocupacion')
```

Implementación en un componente de servidor:
```typescript
export default async function PersonasPage() {
    const supabase = await createClient()
    const { data: personas } = await supabase
        .from('personas')
        .select('id, nombre, email, ocupacion')

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personas?.map(persona => (
                <div key={persona.id}>
                    <h2>{persona.nombre}</h2>
                    <p>{persona.email}</p>
                    <p>{persona.ocupacion}</p>
                </div>
            ))}
        </div>
    )
}
```

### 3. Actualizar (Update)

Actualizar una persona:
```typescript
const { error } = await supabase
  .from('personas')
  .update({ ocupacion: 'Senior Developer' })
  .eq('id', 1)
```

### 4. Eliminar (Delete)

Eliminar una persona:
```typescript
const { error } = await supabase
  .from('personas')
  .delete()
  .eq('id', 1)
```

## Rutas Protegidas

El proyecto implementa rutas protegidas que requieren autenticación:

1. Todas las rutas bajo `/protected/*` requieren autenticación
2. Si un usuario no autenticado intenta acceder, será redirigido a `/auth/login`
3. Ejemplo de ruta protegida: `/protected/personas`

## Estructura de Archivos

```
/app
  /protected
    /personas
      page.tsx         # Página principal del CRUD
/components
  /personas
    create-persona-form.tsx  # Formulario de creación
/lib
  /supabase
    client.ts         # Cliente del navegador
    server.ts         # Cliente del servidor
```

## Componentes Principales

### 1. Página Principal (page.tsx)
- Lista todas las personas
- Incluye el formulario de creación
- Implementa la interfaz básica del CRUD

### 2. Formulario de Creación (create-persona-form.tsx)
- Maneja la creación de nuevas personas
- Implementa validación de formularios
- Gestiona estados de carga y errores

## Mejores Prácticas

1. **Validación**
   - Validar datos tanto en el cliente como en el servidor
   - Usar tipos TypeScript para asegurar la integridad de los datos

2. **Manejo de Errores**
   - Siempre verificar los errores retornados por Supabase
   - Mostrar mensajes de error amigables al usuario

3. **Optimización**
   - Usar Server Components cuando sea posible
   - Implementar caching donde sea apropiado

4. **Seguridad**
   - Usar rutas protegidas para operaciones sensibles
   - Implementar validación de permisos en el backend

