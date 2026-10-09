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
