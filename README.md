# Voyage

> MSA 2026 Phase 2 — Software Stream

## Deployment

- Frontend: _[add once deployed]_
- Backend / API docs (Scalar): _[add once deployed]_

## Introduction

Voyage turns real world travel into the exploration of an unknown realm.
It mimicks how people used to travel on boat and did not know which land they were traveling to. 
When you join, the world map lies hidden beneath fog. every country you
actually visit becomes discovered, permanently revealed on your
personal map. Over time your map fills in, tracking how much of the
world you've actually explored.

## How this relates to the theme

The assignment's theme is gamification, using points, badges, streaks,
leaderboards, and progress tracking to make a non game task more
engaging. Voyage applies this directly to travel:

- **Progress tracking** — a live "X / 177 lands charted" counter, broken
  down further by continent, so users can see exactly where they've
  explored and where they haven't.
- **Fog-of-war map** — the core gamification mechanic *is* the visual
  interface: unvisited countries are hidden in muted fog; charting a
  country reveals it in gold, permanently.
- **Leaderboard ("The Fellowship's Ledger")** — ranks users by number of
  countries charted, updating **in real time** via WebSockets whenever
  any user charts a new country.
- **Hover overviews** — hovering any country shows its name, continent,
  and charted status, reinforcing the "exploring an unknown map" feel.

## What makes this project worth highlighting

- **Real time leaderboard via SignalR (WebSockets)** — when any user
  charts a new country, every connected client's leaderboard updates
  live, without a manual refresh. This is a genuine, functioning
  real-time feature, not a static poll-on-interval approximation.
- **The entire app is themed**, not just the map — landing, auth, map,
  and leaderboard all share one consistent olden visual
  language, including a day-appropriate palette system driven by CSS
  custom properties (see `/specs/design-tokens.md`).
- **State management via Zustand** genuinely drives cross-page behavior
  (auth persistence across reloads, map state) rather than being a
  checkbox addition.
- Full CRUD on visits, JWT authentication with password hashing, and a
  hand-drawn SVG filter effect applied to every country border for a
  sketched, aged-map aesthetic.

## Advanced features implemented

- [x] **Implement Security Measures** — password hashing (BCrypt) and
      authorisation (JWT + per-user data scoping). See write-up below.
- [x] **Use a state management library** — Zustand, driving auth
      persistence and map state across the app.
- [x] **Implement WebSockets** — SignalR-powered real-time leaderboard
      updates.

### Security write-up

Two security measures were implemented:

**1. Password hashing (BCrypt).** User passwords are never stored in
plain text. On registration, the password is hashed with BCrypt
(`PasswordHasher.cs`) before being persisted; login verifies the
submitted password against the stored hash rather than comparing raw
strings. This matters because a database leak or backup exposure would
otherwise directly expose every user's real password — likely reused
elsewhere by that person.

**2. Authorisation / per-user data scoping.** Every visit-related
endpoint (`VisitsController`) requires a valid JWT (`[Authorize]`), and
every query is explicitly scoped to the authenticated user's own ID
(read from the JWT's `sub` claim), not a client-supplied user ID. This
prevents one user from reading or modifying another user's travel
history simply by guessing/changing an ID in a request — a common and
serious authorization flaw (IDOR) if left unchecked.

_(Frontend-side note: `/map` is also gated by a `RequireAuth` wrapper
that redirects unauthenticated users to `/login`. This is explicitly
**not** a security boundary — it only improves UX for logged-out users;
the real enforcement is server-side via `[Authorize]`, since anything
client-side can be bypassed.)_

## Self-reflection

Doing it again, I would've tried to go deeper into the project. I would've made the design more interactive using things
like scroll animations to pop out more. The map only covers 177 countries so finding a library which is up to date would be good, potentially even implementing this myself.
Scalabilty wise I think the website would need improvement, for example if there were 100,000 users shown on leaderboard my current implementation may be slow to search. 
Also potentially even looking at a 3D map would be interesting. I think adding more ways for people to interact with each other such as adding friends. Also adding more features and depth
such as tracking what cities in a country have you gone to and who you went with etc. 

## AI usage

See `/specs/ai-usage.md` for details on how AI was used throughout
development.

## Repository structure

```
/frontend   React + TypeScript client (Vite)
/backend    .NET 10 Web API (EF Core + SQLite, Scalar docs)
/specs      Planning docs, AI usage log, design reference
```

## Local development

### Frontend
```
cd frontend
npm install
npm run dev
```

### Backend
```
cd backend
dotnet restore
dotnet ef database update
dotnet run
```