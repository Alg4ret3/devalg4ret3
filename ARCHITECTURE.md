# Arquitectura del Proyecto (Vanguardia 2026)

Este proyecto ha sido re-estructurado siguiendo una arquitectura **basada en Features (Módulos)** y **Atomic Design Lite**, optimizada para Next.js 16 y React 19.

## 📂 Estructura de Carpetas

### `src/app/`
Es el corazón de **Next.js**. Contiene únicamente lo relacionado con el enrutamiento y la configuración global.
- `page.tsx`: Punto de entrada principal. Solo orquesta las "Features".
- `layout.tsx`: Define el marco de la aplicación (Providers, Smooth Scroll).
- `globals.css`: Estilos base y tokens de Tailwind 4.

### `src/features/`
Aquí vive la **lógica de negocio**. Cada sección importante de la web es un módulo independiente.
- `welcome/`: El Hero del sitio con su lógica de animación GSAP Flip.
- `text-showcase/`: Sección de textos animados con ScrollTrigger.
- `whatsapp/`: Componente inteligente del botón de contacto.
- **Beneficio:** Si quieres eliminar una sección, solo borras su carpeta y no dejas "basura" en el resto del proyecto.

### `src/components/layout/`
Componentes estructurales que no pertenecen a una feature específica pero arman la página.
- `Navbar/`, `Footer/`, `NotFound/`.
- `SmoothScroll.tsx`: Integración con **Lenis** para el desplazamiento fluido.

### `src/components/ui/`
Componentes atómicos y genéricos (Botones, Inputs, Badges). Son "tontos" (no tienen lógica de negocio) y altamente reutilizables.

### `src/constants/`
- `index.ts`: El **ÚNICO** lugar donde residen los datos (links, configuración, mensajes).
- **Regla:** Nunca escribas un link o un texto largo directamente en un componente; ponlo aquí.

### `src/context/`
- `LanguageContext.tsx`: Gestión del estado global para multi-idioma (ES/EN).

### `src/hooks/`
- `useScrollLock.ts`: Lógica reutilizable para interactuar con el navegador.

---

## 🛠 Buenas Prácticas Implementadas

1. **React Way (Refs):** Cero uso de `document.getElementById`. Se usan `useRef` y `forwardRef` para que React gestione el DOM de forma segura.
2. **Animaciones Profesionales:** Uso de `useGSAP` para una limpieza automática de memoria y evitar fugas de rendimiento en las animaciones.
3. **Paths Absolutos:** Uso de `@/` para evitar rutas relativas confusas (`../../../../`).
4. **Smooth Scrolling:** Integración de **Lenis** para una experiencia de usuario premium.
5. **Clean Build:** El proyecto está libre de dependencias muertas y errores de TypeScript.

---
*Este documento sirve como guía para cualquier desarrollador que quiera expandir el proyecto manteniendo la calidad original.*
