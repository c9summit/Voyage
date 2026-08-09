# AI Usage Log

AI (Claude) was used extensively throughout this project's development,
across planning, scaffolding, debugging, and styling. This log
summarizes how it was used; full prompt-level detail is in this
conversation's transcript. In specific, claude chat was used so no md was used to instruct AI. 
[Link to chat](https://claude.ai/share/9b45c347-0c78-4f63-abc9-1a7c4a2c5845)

## Summary of AI involvement by area

**Architecture & planning**
- Initial concept discussion (fog-of-war travel gamification), data
  model design (User/Visit), and choice of tech (React+TS, .NET 10,
  EF Core, Zustand, SignalR).

**Frontend**
- React Router setup and route protection (`RequireAuth`)
- Map implementation using `@vnedyalk0v/react19-simple-maps` (chosen
  after discovering the original `react-simple-maps` package doesn't
  support React 19)
- Fog-of-war rendering logic, hover tooltips, continent tracking
- Zustand store design (`useAuthStore`, `useMapStore`)
- SignalR client integration for the live leaderboard
- Styling: fantasy/parchment theme, responsive breakpoints, porthole
  buttons, video backgrounds

**Backend**
- ASP.NET Core Web API structure, EF Core models/DbContext
- JWT authentication + BCrypt password hashing
- SignalR hub for leaderboard broadcasts
- SQLite migration from the starter's in-memory database
- Unit tests (xUnit) for password hashing and visit validation

**Debugging**
- Diagnosed and fixed: JWT claim-mapping bug (`MapInboundClaims`),
  CORS/credentials conflict with SignalR, EF Core LINQ translation
  failure surfaced specifically by switching from in-memory to SQLite,
  various React/TypeScript tooling issues (JSX file extensions, stale
  Vite dependency cache, `FormEvent` deprecation in newer
  `@types/react`), and a performance investigation that traced an
  intermittent multi-second load delay to a Chrome-specific networking
  quirk.

## Reflection

AI was useful for discovering different possible approaches to implementing things.
For example, finding out what library to use for the map was done by having claude
show a list of possible libraries. Once a library was selected I got claude to explain details of the library. 
AI was also useful for testing and bugfixes, speeding up the process. It was easy to direct ideas towards the AI
as context was given. The code outputted by the AI was reviewed and adjusted if need be. AI allowed for the project to be completed much faster. 
It also helped me understand areas where I lacked which would've normally taken a lot of time. 