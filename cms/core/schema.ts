// Esquema genérico del CMS. Un sitio describe su contenido con estas piezas
// (ajustes, colecciones y tipos de bloque) y el panel arma los formularios solo
// a partir de esta descripción. No contiene nada específico de un sitio.

type BaseField = {
  name: string;
  label: string;
  help?: string;
};

export type TextField = BaseField & {
  type: "text";
  multiline?: boolean;
  placeholder?: string;
};
export type NumberField = BaseField & { type: "number"; min?: number };
export type BooleanField = BaseField & { type: "boolean" };
export type ImageField = BaseField & { type: "image" };
export type SelectField = BaseField & {
  type: "select";
  options: { label: string; value: string }[];
};
export type ObjectField = BaseField & { type: "object"; fields: Field[] };
export type ListField = BaseField & {
  type: "list";
  // Tipo de cada elemento.
  of: ItemField;
  // Campo usado como título de cada elemento cuando son objetos.
  itemLabel?: string;
};
export type ReferenceField = BaseField & {
  type: "reference";
  collection: string;
  multiple?: boolean;
};

export type Field =
  | TextField
  | NumberField
  | BooleanField
  | ImageField
  | SelectField
  | ObjectField
  | ListField
  | ReferenceField;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type ItemField = DistributiveOmit<Field, "name" | "label">;

export type BlockDefinition = {
  type: string;
  label: string;
  description?: string;
  fields: Field[];
  defaults: Record<string, unknown>;
};

export type CollectionDefinition = {
  name: string;
  label: string;
  singularLabel: string;
  // Prefijo de URL de cada elemento, por ejemplo "projects" → /projects/{id}.
  path?: string;
  titleField: string;
  imageField?: string;
  fields: Field[];
  defaults: Record<string, unknown>;
};

export type CmsConfig = {
  name: string;
  settings: {
    fields: Field[];
    // Lista de ajustes con {label, href} que funciona como menú. Si está, el
    // panel ofrece agregar o quitar cada página del menú.
    navField?: string;
  };
  collections: CollectionDefinition[];
  blocks: BlockDefinition[];
};

export function defineConfig(config: CmsConfig): CmsConfig {
  return config;
}

export function defaultForField(field: Field | ItemField): unknown {
  switch (field.type) {
    case "text":
    case "image":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "select":
      return field.options[0]?.value ?? "";
    case "object":
      return Object.fromEntries(
        field.fields.map((f) => [f.name, defaultForField(f)])
      );
    case "list":
      return [];
    case "reference":
      return field.multiple ? [] : "";
  }
}
