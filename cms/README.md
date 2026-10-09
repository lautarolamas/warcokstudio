# Back office (CMS)

Panel para editar el contenido del sitio con vista previa en vivo. Está en `/admin`.

## Cómo está armado

- `content/content.json`: todo el contenido del sitio (ajustes, colecciones y páginas armadas con bloques).
- `cms/`: el núcleo genérico. No sabe nada de este sitio.
  - `core/schema.ts`: tipos de campo (texto, número, sí/no, opciones, imagen, objeto, lista, referencia).
  - `core/storage.ts`: dónde se guarda (disco o GitHub).
  - `core/auth.ts`, `next/middleware.ts`: acceso con contraseña.
  - `next/route-handlers.ts`: la API (`/api/cms/...`).
  - `react/`: el proveedor de contenido que usa el sitio y el puente de vista previa.
  - `admin/`: el panel, que arma los formularios a partir del esquema.
- `cms.config.ts`: qué ajustes, colecciones y bloques tiene **este** sitio.
- `site/`: los componentes que dibujan cada bloque y cada plantilla de colección.

La vista previa carga el sitio real en un iframe (`/cms-preview/...`) y le manda el borrador por `postMessage` en cada cambio. Pasando el mouse por un bloque aparece "Editar", que abre ese bloque en el panel.

## Variables de entorno

| Variable | Para qué |
| --- | --- |
| `CMS_PASSWORD` | Contraseña del panel. Sin ella, el panel solo queda abierto en desarrollo. |
| `CMS_SECRET` | Opcional. Clave para firmar la sesión (por defecto usa la contraseña). |
| `CMS_GITHUB_REPO` | `usuario/repo`. Junto con el token, guarda cada cambio como commit. |
| `CMS_GITHUB_TOKEN` | Token de GitHub con permiso de escritura de contenidos sobre ese repo. |
| `CMS_GITHUB_BRANCH` | Rama donde se guarda (por defecto `main`). |

Sin las variables de GitHub, el contenido y las imágenes se guardan en el disco (`content/` y `public/uploads/`), que es lo que sirve en desarrollo. En Vercel el disco no es persistente, así que en producción hay que configurar GitHub: el sitio lee el contenido desde el repo y se actualiza al guardar, sin esperar un deploy.

## Usarlo en otro sitio Next.js

1. Copiar `cms/`, `middleware.ts`, `app/admin/`, `app/api/cms/` y `app/(site)/cms-preview/`.
2. Escribir el `cms.config.ts` del sitio y un `content/content.json` inicial.
3. Envolver el sitio con `<ContentProvider initialContent={await getContent()}>` y leer el contenido con `useSettings`, `useCollection` o `useContent`.
4. Crear los componentes de cada bloque y un `RouteView` como el de `site/route-view.tsx`, y una ruta catch-all que lo renderice.
