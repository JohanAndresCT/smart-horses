# Smart Horses

Un juego de caballos medievales con IA, construido con Next.js y Python Serverless.

## Estructura del Proyecto

```
smart-horses/
├── components/        # Componentes React generados por Figma Make
├── styles/           # Estilos globales
├── utils/            # Cliente API y utilidades frontend
├── api/              # Backend Python Serverless
├── shared/           # Tipos y constantes compartidas
├── App.tsx           # Componente principal con navegación
└── vercel.json       # Configuración de despliegue
```

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Backend

El backend está implementado en Python 3.11 como funciones serverless en `/api`.

- `ai_move.py` - Endpoint principal para calcular movimientos de IA
- `minimax.py` - Algoritmo minimax con poda alfa-beta
- `heuristics.py` - Funciones de evaluación
- `move_generator.py` - Generador de movimientos válidos
- `game_logic.py` - Lógica del estado del juego

## Despliegue

El proyecto está configurado para desplegarse en Vercel:

```bash
vercel
```
