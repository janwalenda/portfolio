/**
 * Definiert die Struktur der Metadaten, die in der API-Antwort enthalten sind.
 * In diesem Fall ist es ein leeres Objekt.
 */
export interface Meta {
  // Falls die Meta-Informationen in Zukunft erweitert werden (z.B. Paginierung),
  // kann man hier weitere Felder hinzufügen, z.B.
  // pagination?: { page: number; pageSize: number; total: number; pageCount: number; };
  [key: string]: string; // Erlaubt beliebige zusätzliche Eigenschaften, falls Meta nicht leer ist
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null; // Oder hier ein spezifisches Interface definieren, wenn bekannt
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Tag {
  id: number;
  tag: string;
}

export interface NavigationItem {
  id: number,
  url: string,
  label?: string,
  icon?: string,
}

export interface NavigationAttributes {
  id: number,
  documentId: string,
  title: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  locale: string,
  navigation: NavigationItem[],
}

/**
 * Definiert die spezifischen Attribute des Dokument-Objekts.
 */
export interface PageAttributes {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string; // Hier könnte der Markdown-Inhalt liegen
  createdAt: string; // ISO 8601 Datum/Zeit-String
  updatedAt: string; // ISO 8601 Datum/Zeit-String
  publishedAt: string | null; // Kann ein String oder null sein
  locale: string;
  slug: string;
}

export interface BlogAttributes {
  id: number,
  documentId: string,
  title: string,
  description: string,
  date: string,
  author: string,
  thumbnailAlt: string,
  thumbnail: ImageData,
  tags: Tag[],
  content: string,
  slug: string,
  createdAt: string,
  updatedAt: string,
  publishedAt?: string,
  locale: string
}

export interface StrapiApiResponse<T> {
  data: T;
  meta: Meta;
}