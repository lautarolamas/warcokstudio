/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // El contenido editable se lee del disco cuando no se usa GitHub.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
  // Como el almacenamiento en disco arma rutas a partir de process.cwd(), el
  // trazado incluía todo el proyecto (.git, imágenes de public/) en cada
  // función y superaba el límite de Vercel. public/ lo sirve el CDN.
  outputFileTracingExcludes: {
    "/**": ["./.git/**/*", "./public/**/*", "./scripts/**/*", "./tsconfig.tsbuildinfo"],
  },
  async rewrites() {
    return {
      // Las imágenes subidas desde el panel viven en public/uploads. Mientras
      // un archivo nuevo todavía no está en el build, se sirve desde la API.
      fallback: [
        { source: "/uploads/:file", destination: "/api/cms/media/:file" },
      ],
    };
  },
}

export default nextConfig
