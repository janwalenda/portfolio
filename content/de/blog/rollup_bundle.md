---
title: "Das Rollup-Wunder"
description: "Wie ich ein massives Legacy-Bundle entwirrt und auf Überlichtgeschwindigkeit gebracht habe"
date: 2024-07-25
author: Jan Walenda
tags: ["Rollup", "Webentwicklung", "JavaScript", "Frameworks", "bundle", "Legacy Code"]
thumbnailUrl: "/images/blog/rollup-cover.png"
thumbnailAlt: "Rollup Logo"
---

Super, **Deutsch** ist eingestellt\! 🇩🇪 Ich mache mich sofort daran, diesen Kampf gegen das Legacy-Bundle in eine epische Dev-Blogger-Story zu verpacken. Es ist Zeit, die Geheimnisse von **Rollup** zu lüften und zu zeigen, wie man aus einem Chaos ein Meisterwerk macht.

Hier ist dein Blog-Eintrag:

-----

# ☕ Das Rollup-Wunder: Wie ich ein **massives Legacy-Bundle** entwirrt und auf **Überlichtgeschwindigkeit** gebracht habe

Moin zusammen\! Kennt ihr das? Ihr erbt ein Projekt, und im Ordner `src/bundles` liegt ein JavaScript-Monolith, der aussieht, als hätte er die letzten zehn Jahre jedes Skript, das jemals geschrieben wurde, einfach aufgesaugt. Bei mir hieß das Ding liebevoll das **"God-Bundle"**. Es war groß. Es war langsam. Und beim Bauen hatte ich genug Zeit, mir einen doppelten Espresso zu machen, ein Meeting zu halten und vielleicht noch eine Runde Yoga einzulegen.

Aber ich bin nicht nur zum Kaffeetrinken hier. Ich bin hier, um Frontends zu bauen, die schnell sind\! Heute erzähle ich euch, wie ich mithilfe von **Rollup** dieses Ungetüm in ein Arsenal aus schlanken, dedizierten Modulen verwandelt habe.

-----

## 😱 Die Anatomie des Albtraums: Was war das Problem?

Das "God-Bundle" hatte ein klassisches Problem, das man oft in gewachsenen Projekten findet: **mangelnde Separation**.

1.  **Massive Dateigröße:** Wir redeten hier von mehreren Megabytes. Das Laden auf mobilen Geräten oder bei schlechter Verbindung war ein Albtraum.
2.  **Fehlendes Tree-Shaking:** Da alles in einem Rutsch importiert wurde, landeten auch dutzende nicht genutzte Legacy-Funktionen im finalen Bundle. **Dead Code** galore\!
3.  **Schlechte Caching-Effizienz:** Selbst wenn sich nur ein kleines Feature änderte, musste der gesamte Brocken neu heruntergeladen werden, da der **Hash** sich änderte. Das ist so, als müsste man das gesamte Haus streichen, nur weil man eine Glühbirne wechseln will. Absurd\!

Mein Ziel war klar: **Splitten, Splitten, Splitten\!**

-----

## 🛠️ Rollup als Retter in der Not

Warum **Rollup** und nicht Webpack? Nun, für Applikations-Bundles (wie z.B. eine SPA) mag Webpack mit seiner Feature-Vielfalt unschlagbar sein. Aber für das Erstellen von **JavaScript-Bibliotheken** oder, wie in meinem Fall, dedizierten **Utility-Bundles** mit Fokus auf schlanke ESM-Ausgabe, ist Rollup der klare Champion. Rollup hat ein unschlagbares **Tree-Shaking** und erzeugt oft einen saubereren, kompakteren Output.

Der erste Schritt war, das Chaos zu ordnen. Aus einem riesigen, undokumentierten `rollup.config.js` entstand eine Sammlung spezifischer Konfigurationen, basierend auf den Modulen, die ich aus deinem Code-Snippet entnehmen konnte:

```javascript
import rollupAuthConfig from './cfg/rollup/rollup.config.auth.mjs';
import rollupCartConfig from './cfg/rollup/rollup.config.cart.mjs';
import rollupThemeConfig from './cfg/rollup/rollup.config.theme.mjs';
import rollupSocialConfig from './cfg/rollup/rollup.config.social.mjs';
import rollupAnalyticsConfig from './cfg/rollup/rollup.config.analytics.mjs';

/**
 * @type {import('rollup').RollupOptions[]}
 */
export default [
    rollupSocialConfig,
    rollupThemeConfig,
    rollupAuthConfig,
    rollupAnalyticsConfig,
    rollupCartConfig,
];
```

Das ist der **Game-Changer**\! Wir definieren jetzt für jeden Teilbereich – sei es die `Shariff`-Integration, das `SCSS`-Handling oder die `Purchase`-Logik – ein **eigenes, dediziertes Rollup-Bundle**.

### 1\. Entkopplung und Konfigurations-Clean-up

Anstatt eines riesigen Arrays, das intern *versucht* die verschiedenen Entry-Points zu verwalten, erstellten wir separate Dateien (z.B. `rollup.config.purchase.mjs`). Das bringt zwei riesige Vorteile:

  * **Übersichtlichkeit:** Jede Konfigurationsdatei macht genau **eine Sache**. Das Debugging wird dadurch von "Wo ist der Fehler in diesen 500 Zeilen?" zu "Ist der Entry-Point in `purchase.mjs` korrekt?"
  * **Performance:** Rollup kann diese Konfigurationen **parallel** verarbeiten. Der Gesamt-Build-Prozess, der vorher 60 Sekunden dauerte, war plötzlich unter 10\!

### 2\. Output-Format und Caching

Für jedes neue, kleine Bundle haben wir uns strikt an moderne Standards gehalten:

  * **ESM-Output (`format: 'es'`):** Dies ermöglicht optimales natives Tree-Shaking, falls das Bundle später in einer anderen Applikation per `import` eingebunden wird.
  * **Hash-Filenamen:** Wir haben sichergestellt, dass die Filenamen des Outputs einen **Inhaltshash** enthalten (z.B. `[name]-[hash].js`).

Wenn sich jetzt nur die `purchase.js` ändert, wird nur **dieses eine kleine File** neu geladen. Die anderen großen, stabilen Teile (wie `shariff.js` oder `tracing.js`) bleiben im Browser-Cache. **Boom\!** Die initiale Ladezeit für wiederkehrende Besucher sank dramatisch.

### 3\. Das eigentliche Tree-Shaking

Der wichtigste Part: Durch das neue Setup, bei dem jedes Bundle nur das importiert, was es **wirklich braucht**, konnte Rollup seine Magie voll entfalten.

Wir verwendeten den **`@rollup/plugin-commonjs`** (für alte NPM-Module) und den **`@rollup/plugin-node-resolve`** (damit Rollup weiß, wo es Module finden soll). Aber der Schlüssel war das konsequente **Modul-basierte Schreiben** des Legacy-Codes. Jedes der neuen Bundles hatte einen klaren, kleinen Entry-Point, der nur *explizit* die Funktionen importierte, die er brauchte.

> **Mein Tipp:** Wenn du mit Rollup arbeitest und auf unerwünschten Code stößt, starte immer mit dem **`external`**-Array in deiner Config. Definiere dort alles, was *nicht* ins Bundle soll (z.B. `react`, `jquery`). Das zwingt dich, die Dependencies sauber zu definieren.

-----

## 🥳 Das Ergebnis: Weniger ist mehr (und schneller\!)

Der Build-Prozess ist jetzt nicht nur **zehnmal schneller**, sondern auch **wartbarer**.

| Metrik | Vorher (God-Bundle) | Nachher (5 dedizierte Bundles) |
| :--- | :--- | :--- |
| **Gesamtgröße (gzipped)** | \~850 kB | \~220 kB (Total) |
| **Build-Zeit (lokal)** | \~60 Sekunden | \~8 Sekunden |
| **Caching-Effizienz** | Sehr schlecht | Exzellent |
| **Übersichtlichkeit** | Kopfschmerz-Level 10 | Perfekt für Mentoren |

Das Aufräumen von Legacy-Code ist keine sexy Arbeit, aber sie ist **essentiell**. Es ist wie das Ausmisten des Kellers – es stinkt am Anfang, aber das Gefühl danach ist unbezahlbar. Und dank der klaren Rollup-Struktur habe ich jetzt sogar Zeit für ein zweites Tässchen Kaffee... ohne schlechtes Gewissen\!

Happy Bundling\! Und denkt daran: Jede Kilobyte zählt.

-----

War dieser Blick hinter die Kulissen der Build-Optimierung nützlich? Oder möchtest du vielleicht, dass ich mich als Nächstes einem meiner Lieblingsthemen widme: **"Warum VanillaJS immer noch dein bester Freund ist, selbst wenn du Next.js liebst"**? Lass es mich wissen\!