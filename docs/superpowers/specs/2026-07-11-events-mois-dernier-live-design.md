# Events du mois dernier — live & auto-update (home S4)

**Date**: 2026-07-11
**Statut**: validé, prêt à implémenter

## Problème

La section S4 de la home (`/fr`, `/en`) « Les Events du mois dernier sur bubbleOut »
affiche `CURATED_EVENTS`, une liste statique codée en dur dans `lib/constants.ts`
(events de mai 2026). Elle ne se met jamais à jour : le 11 juillet, elle montre
encore mai au lieu de juin. Le job quotidien `scripts/refresh-data.mjs` ne
régénère que `lib/live-data.json` (stats + membres de clubs), pas ces events.

## Objectif

La grille S4 affiche automatiquement les **4 events les plus populaires du mois
civil précédent** à Montréal, en live depuis MongoDB (ISR 1 h), avec
`CURATED_EVENTS` comme fallback. `/montreal` reste inchangé.

## Décisions (validées avec l'utilisateur)

- **Mécanisme** : live ISR au runtime, comme `/montreal` (pas de JSON committé).
  Réutilise toute la logique de curation de `lib/events.ts`.
- **Sélection** : les 4 events du mois dernier avec le plus de participants,
  mesurés par le nombre d'**utilisateurs distincts** dans `event_like_master`
  (statut `dislike` exclu).
- **Fenêtre** : mois civil précédent `[début mois dernier, début mois courant)`,
  bornes calculées dans le fuseau `America/Montreal`.

## Faits DB confirmés (lecture seule, 2026-07-11)

- 27 events éligibles pour juin 2026 (public, Montréal, `deletedAt: null`, image).
- `event_like_master` : champs `event`, `user`, `status` (`dislike|invite|invites|like`).
  Ranking par likes cohérent (top : « pic nic - barbecue au Parc Agrigon » 85,
  « Week-end au bord de l'eau » 62, « France - Sénégal » 60…).
- `next.config` autorise déjà le host distant `api.bubbleout.fr` pour les images.

## Changements

### 1. `lib/events.ts` — `getLastMonthPopularMontrealEvents(limit = 4)`

Fonction sœur de `getUpcomingMontrealEvents`, retournant `Promise<EventCard[] | null>` :

- Fenêtre = mois civil précédent, calculée en `America/Montreal`.
- Filtres identiques : `eventVisibility: "public"`, regex localisation Montréal
  **sans** `\b` (limitation PCRE/`é` déjà documentée), `deletedAt: null`, image présente.
- `$lookup` sur `event_like_master` → nombre d'utilisateurs distincts (`$addToSet`
  sur `user`, hors `status: "dislike"`), tri décroissant, `$limit` de sécurité.
- Réutilise les helpers existants : `stripEmoji`, `publicPlace`, `themeColor`,
  dedupe `normTitle`, formateur date `fr-CA`.
- Fallback : `events.length >= 4 ? events : null`. `try/catch → null` (comme l'existant).
- **Refactor DRY** : extraire la boucle `row → EventCard` + dedupe dans un helper
  interne partagé par les deux fonctions.

### 2. `app/[locale]/page.tsx`

- `export const revalidate = 3600;` (ISR, comme `/montreal`).
- `const lastMonthEvents = await getLastMonthPopularMontrealEvents();`
- Grille S4 : `<EventsGrid events={lastMonthEvents ?? CURATED_EVENTS} />`.
- Titre/copy inchangés ; le fallback conserve le comportement actuel.

## Hors périmètre (YAGNI)

Pas de nouvelle clé dans `live-data.json`, pas de modif du job quotidien,
pas de changement de copy, pas de touche à `/montreal`.

## Vérification

Le repo n'a pas d'infra de test (convention existante). Vérification :
1. Probe DB confirmant ≥ 4 events et un ranking cohérent pour le mois précédent.
2. `npm run build` sans erreur.
3. Chargement de `/fr` et `/en` : S4 montre les events de juin ; fallback garanti si DB indispo.
