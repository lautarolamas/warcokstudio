import { defineConfig, type Field } from "@/cms/core/schema";

// Configuración del back office para este sitio: qué ajustes tiene, qué
// colecciones y qué tipos de bloque se pueden usar para armar páginas.
// Para usar el CMS en otro sitio se reemplaza este archivo y site/.

const link: Field[] = [
  { type: "text", name: "linkLabel", label: "Texto del enlace" },
  {
    type: "text",
    name: "linkHref",
    label: "Destino del enlace",
    placeholder: "/contact",
  },
];

export default defineConfig({
  name: "Belen Warcok",

  settings: {
    navField: "nav",
    fields: [
      { type: "text", name: "siteName", label: "Nombre del sitio" },
      { type: "text", name: "seoTitle", label: "Título para buscadores" },
      {
        type: "text",
        name: "seoDescription",
        label: "Descripción para buscadores",
        multiline: true,
      },
      {
        type: "list",
        name: "nav",
        label: "Menú",
        itemLabel: "label",
        of: {
          type: "object",
          fields: [
            { type: "text", name: "label", label: "Texto" },
            { type: "text", name: "href", label: "Ruta", placeholder: "/work" },
          ],
        },
      },
      {
        type: "list",
        name: "socials",
        label: "Redes sociales",
        itemLabel: "label",
        of: {
          type: "object",
          fields: [
            { type: "text", name: "label", label: "Nombre" },
            { type: "text", name: "url", label: "URL" },
            {
              type: "select",
              name: "icon",
              label: "Ícono en celular",
              options: [
                { label: "Instagram", value: "instagram" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Behance", value: "behance" },
                { label: "Otro (iniciales)", value: "other" },
              ],
            },
          ],
        },
      },
      { type: "text", name: "footerName", label: "Nombre en el footer" },
      { type: "text", name: "creditLabel", label: "Crédito: texto" },
      { type: "text", name: "creditName", label: "Crédito: nombre" },
      { type: "text", name: "creditUrl", label: "Crédito: enlace" },
    ],
  },

  collections: [
    {
      name: "projects",
      label: "Proyectos",
      singularLabel: "Proyecto",
      path: "projects",
      titleField: "title",
      imageField: "image",
      fields: [
        { type: "text", name: "title", label: "Título" },
        {
          type: "text",
          name: "cardTitle",
          label: "Título corto (tarjetas)",
          help: "Si lo dejás vacío se usa el título.",
        },
        { type: "text", name: "description", label: "Descripción", multiline: true },
        { type: "text", name: "client", label: "Cliente" },
        { type: "text", name: "year", label: "Año" },
        {
          type: "list",
          name: "services",
          label: "Servicios",
          of: { type: "text" },
        },
        { type: "image", name: "image", label: "Imagen de portada" },
        { type: "list", name: "images", label: "Galería", of: { type: "image" } },
        { type: "list", name: "logos", label: "Logos", of: { type: "image" } },
      ],
      defaults: {
        title: "Nuevo proyecto",
        cardTitle: "",
        description: "",
        client: "",
        year: String(new Date().getFullYear()),
        services: [],
        image: "/placeholder.jpg",
        images: [],
        logos: [],
      },
    },
  ],

  blocks: [
    {
      type: "hero",
      label: "Portada",
      description: "Título grande con subtítulo y palabras que rotan",
      fields: [
        { type: "text", name: "title", label: "Título" },
        { type: "text", name: "subtitle", label: "Subtítulo" },
        {
          type: "list",
          name: "rotatingWords",
          label: "Palabras que rotan",
          of: { type: "text" },
        },
      ],
      defaults: { title: "Título", subtitle: "", rotatingWords: [] },
    },
    {
      type: "projectGrid",
      label: "Grilla de proyectos",
      description: "Tarjetas de proyectos de la colección",
      fields: [
        { type: "text", name: "heading", label: "Título" },
        {
          type: "select",
          name: "layout",
          label: "Diseño",
          options: [
            { label: "Destacados (mosaico)", value: "featured" },
            { label: "Grilla con título grande", value: "grid" },
          ],
        },
        {
          type: "reference",
          name: "projects",
          label: "Proyectos",
          collection: "projects",
          multiple: true,
          help: "Vacío muestra todos, en el orden de la colección.",
        },
        {
          type: "number",
          name: "limit",
          label: "Cantidad máxima",
          min: 0,
          help: "0 muestra todos.",
        },
        ...link,
      ],
      defaults: {
        heading: "Proyectos",
        layout: "grid",
        projects: [],
        limit: 0,
        linkLabel: "",
        linkHref: "",
      },
    },
    {
      type: "pageTitle",
      label: "Título de página",
      fields: [{ type: "text", name: "title", label: "Título" }],
      defaults: { title: "Nueva página" },
    },
    {
      type: "richText",
      label: "Texto",
      description: "Párrafos de texto; separalos con una línea en blanco",
      fields: [
        { type: "text", name: "heading", label: "Título (opcional)" },
        { type: "text", name: "text", label: "Texto", multiline: true },
      ],
      defaults: { heading: "", text: "Escribí acá el texto." },
    },
    {
      type: "profile",
      label: "Perfil",
      description: "Foto redonda con nombre y rol",
      fields: [
        { type: "image", name: "image", label: "Foto" },
        { type: "text", name: "name", label: "Nombre" },
        { type: "text", name: "role", label: "Rol" },
      ],
      defaults: { image: "/placeholder-user.jpg", name: "Nombre", role: "" },
    },
    {
      type: "services",
      label: "Servicios",
      description: "Columnas con listas de servicios",
      fields: [
        { type: "text", name: "heading", label: "Título" },
        {
          type: "list",
          name: "groups",
          label: "Columnas",
          itemLabel: "title",
          of: {
            type: "object",
            fields: [
              { type: "text", name: "title", label: "Título" },
              { type: "list", name: "items", label: "Ítems", of: { type: "text" } },
            ],
          },
        },
      ],
      defaults: { heading: "Servicios", groups: [] },
    },
    {
      type: "cta",
      label: "Llamado a la acción",
      description: "Título, texto y un enlace",
      fields: [
        { type: "text", name: "heading", label: "Título" },
        { type: "text", name: "text", label: "Texto" },
        ...link,
      ],
      defaults: {
        heading: "Contacto",
        text: "",
        linkLabel: "Escribime",
        linkHref: "/contact",
      },
    },
    {
      type: "textBanner",
      label: "Frase destacada",
      fields: [{ type: "text", name: "text", label: "Texto", multiline: true }],
      defaults: { text: "Una frase corta" },
    },
    {
      type: "imageGallery",
      label: "Galería de imágenes",
      fields: [
        { type: "text", name: "heading", label: "Título (opcional)" },
        {
          type: "select",
          name: "columns",
          label: "Columnas",
          options: [
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
          ],
        },
        { type: "list", name: "images", label: "Imágenes", of: { type: "image" } },
      ],
      defaults: { heading: "", columns: "2", images: [] },
    },
    {
      type: "contact",
      label: "Contacto y formulario",
      description: "Datos de contacto y el formulario que envía el email",
      fields: [
        { type: "text", name: "infoHeading", label: "Título de datos" },
        { type: "text", name: "email", label: "Email visible" },
        { type: "boolean", name: "showSocials", label: "Mostrar redes sociales" },
        { type: "text", name: "formHeading", label: "Título del formulario" },
        { type: "text", name: "submitLabel", label: "Texto del botón" },
        { type: "text", name: "successTitle", label: "Título al enviar" },
        { type: "text", name: "successText", label: "Texto al enviar", multiline: true },
      ],
      defaults: {
        infoHeading: "Información de contacto",
        email: "",
        showSocials: true,
        formHeading: "Envíanos un mensaje",
        submitLabel: "Enviar mensaje",
        successTitle: "Mensaje enviado",
        successText: "Gracias por escribir.",
      },
    },
  ],
});
