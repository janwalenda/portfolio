# SEO Implementation Guide

## Übersicht

Das SEO-System besteht aus drei Hauptkomponenten:

1. **SeoType Schema** (`/sanity/schemaTypes/SeoType.ts`) - Definiert die SEO-Felder
2. **Default SEO** in Site Settings - Globale Standard-SEO-Einstellungen
3. **Page/Post SEO** - Überschreibt die Defaults für einzelne Seiten/Posts

## Features

### Meta Tags
- **Meta Title**: Titel für Suchmaschinen (50-60 Zeichen empfohlen)
- **Meta Description**: Beschreibung für Suchmaschinen (150-160 Zeichen empfohlen)
- **Meta Keywords**: Keywords (optional, weniger wichtig für modernes SEO)

### Open Graph (Facebook, LinkedIn)
- **OG Title**: Titel für Social Media
- **OG Description**: Beschreibung für Social Media
- **OG Image**: Bild für Social Media (1200x630px empfohlen)

### Twitter Card
- **Twitter Card Type**: summary, summary_large_image, app, oder player
- **Twitter Title**: Titel für Twitter
- **Twitter Description**: Beschreibung für Twitter
- **Twitter Image**: Spezifisches Bild für Twitter (1200x675px empfohlen)

### Search Engine Directives
- **Canonical URL**: Verhindert Duplicate Content
- **No Index**: Verhindert Indexierung durch Suchmaschinen
- **No Follow**: Verhindert das Folgen von Links auf der Seite

## Verwendung in Next.js

### 1. In Site Settings (Default SEO)

Gehe zu Sanity Studio → Site Settings → SEO Tab und fülle die Default-SEO-Felder aus. Diese werden verwendet, wenn keine spezifischen SEO-Daten für eine Seite/Post vorhanden sind.

### 2. In Pages/Posts (Override)

Beim Bearbeiten einer Page oder eines Posts findest du ein SEO-Feld. Fülle nur die Felder aus, die du überschreiben möchtest. Leere Felder verwenden automatisch die Defaults aus Site Settings.

### 3. Im Code (Layout/Page)

```typescript
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import { getConfig } from "@/sanity/lib/config/getConfig";

// In deiner Page-Komponente
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const config = await getConfig();
  const page = await getPage(params.slug); // Deine Funktion zum Abrufen der Page
  
  return generateSeoMetadata(
    page?.seo,                    // Page-spezifisches SEO
    config?.defaultSeo,           // Default SEO aus Site Settings
    page?.title,                  // Fallback Title
    "Default description"         // Fallback Description
  );
}
```

### 4. Beispiel für Blog Posts

```typescript
import { generateSeoMetadata } from "@/lib/generateSeoMetadata";
import { getConfig } from "@/sanity/lib/config/getConfig";
import { getPost } from "@/sanity/lib/blog/getPost";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const config = await getConfig();
  const post = await getPost(params.slug);
  
  return generateSeoMetadata(
    post?.seo,
    config?.defaultSeo,
    post?.title,
    post?.description
  );
}
```

## Fallback-Kette

Die SEO-Werte werden in folgender Reihenfolge verwendet:

1. **Page/Post SEO** - Höchste Priorität
2. **Default SEO** (aus Site Settings)
3. **Fallback-Werte** (title, description Parameter)
4. **Hard-coded Defaults**

### Beispiel für Meta Title:

```
Page SEO metaTitle
  ↓ (falls leer)
Default SEO metaTitle
  ↓ (falls leer)
Fallback Title (z.B. page.title)
  ↓ (falls leer)
"Website"
```

### Beispiel für OG Title:

```
Page SEO ogTitle
  ↓ (falls leer)
Page SEO metaTitle
  ↓ (falls leer)
Default SEO ogTitle
  ↓ (falls leer)
Default SEO metaTitle
  ↓ (falls leer)
Fallback Title
  ↓ (falls leer)
"Website"
```

## Best Practices

### 1. Default SEO einrichten
- Fülle alle Default-SEO-Felder in Site Settings aus
- Verwende ein Standard-OG-Image (z.B. dein Logo oder ein Branding-Bild)
- Setze sinnvolle Default-Werte für Title und Description

### 2. Page/Post SEO
- Überschreibe nur die Felder, die sich von den Defaults unterscheiden
- Für wichtige Seiten: Eigene Meta Title und Description
- Für Blog Posts: Immer eigene Description und OG Image verwenden

### 3. Bilder
- **OG Image**: 1200x630px (Facebook, LinkedIn)
- **Twitter Image**: 1200x675px (oder verwende OG Image)
- Verwende aussagekräftige Alt-Texte

### 4. Titel-Längen
- **Meta Title**: 50-60 Zeichen
- **Meta Description**: 150-160 Zeichen
- Sanity zeigt Warnungen bei Überschreitung

### 5. Keywords
- Weniger wichtig für modernes SEO
- Verwende 5-10 relevante Keywords
- Fokussiere dich mehr auf Title und Description

## Validierung

Das Schema enthält automatische Validierungen:

- ⚠️ Warnung bei Title > 60 Zeichen
- ⚠️ Warnung bei Description > 160 Zeichen
- Hilfreiche Beschreibungen für jedes Feld

## Robots Meta Tags

### No Index
Verhindert, dass Suchmaschinen die Seite indexieren. Nützlich für:
- Danke-Seiten
- Login/Registrierung
- Interne Tools
- Duplicate Content

### No Follow
Verhindert, dass Suchmaschinen Links auf der Seite folgen. Selten verwendet.

## Canonical URL

Verwende Canonical URLs um:
- Duplicate Content zu vermeiden
- Die bevorzugte Version einer Seite anzugeben
- Cross-Domain Content zu verlinken

Beispiel: Wenn du denselben Content auf mehreren URLs hast, setze die Canonical URL auf die Haupt-URL.

## Troubleshooting

### SEO-Daten werden nicht angezeigt
1. Prüfe, ob das SEO-Feld in Sanity ausgefüllt ist
2. Prüfe, ob Default SEO in Site Settings ausgefüllt ist
3. Prüfe, ob `generateSeoMetadata()` korrekt aufgerufen wird
4. Prüfe die Browser DevTools → Meta Tags im `<head>`

### Bilder werden nicht angezeigt
1. Prüfe, ob das Bild in Sanity hochgeladen ist
2. Prüfe die Bildgröße (sollte mindestens 1200px breit sein)
3. Teste mit Facebook Debugger: https://developers.facebook.com/tools/debug/
4. Teste mit Twitter Card Validator: https://cards-dev.twitter.com/validator

### Änderungen werden nicht übernommen
1. Lösche den Next.js Cache: `rm -rf .next`
2. Rebuilde die App: `npm run build`
3. Für Social Media: Cache muss bei Facebook/Twitter geleert werden
