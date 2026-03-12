# WorkshopDemo – Todo App

Eine einfache Todo-Anwendung als Monorepo, konzipiert für einen **GitHub Copilot Workshop**. Die App demonstriert eine Full-Stack-Architektur mit ASP.NET Core und React und eignet sich für Übungen zu Prototyping, TDD, Refactoring, Debugging, Code Review und Security.

## Architekturüberblick

```
┌─────────────────┐       HTTP/JSON       ┌──────────────────────┐
│   React + Vite  │  ←─────────────────→  │  ASP.NET Core 8 API  │
│   (Port 5173)   │                       │    (Port 5062)       │
└─────────────────┘                       └──────────────────────┘
                                                    │
                                          ┌─────────┴──────────┐
                                          │  TodoService       │
                                          │  (In-Memory List)  │
                                          └────────────────────┘
```

| Schicht       | Technologie                   | Pfad                  |
|---------------|-------------------------------|-----------------------|
| Frontend      | React 18 + TypeScript + Vite  | `src/Todo.App/`       |
| Backend API   | ASP.NET Core 8 Web API        | `src/Todo.Api/`       |
| Backend Tests | xUnit + WebApplicationFactory | `tests/Todo.Api.Tests/` |
| Frontend Tests| Vitest + React Testing Library| `tests/Todo.App.Tests/` |
| CI            | GitHub Actions                | `.github/workflows/`  |

## Projektstruktur

```
WorkshopDemo/
├── src/
│   ├── Todo.Api/              # ASP.NET Core Web API
│   │   ├── Controllers/       # REST-Endpunkte
│   │   ├── DTOs/              # Request/Response Objekte
│   │   ├── Models/            # Domain Model
│   │   ├── Services/          # Business Logic
│   │   └── Program.cs         # App-Konfiguration
│   └── Todo.App/              # React Frontend
│       ├── src/
│       │   ├── components/    # React-Komponenten
│       │   ├── services/      # API-Client
│       │   └── types/         # TypeScript-Typen
│       └── index.html
├── tests/
│   ├── Todo.Api.Tests/        # Backend Unit- & Integrationstests
│   └── Todo.App.Tests/        # Frontend Tests
├── docs/
│   └── workshop-scenarios.md  # Workshop-Übungen
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/ci.yml
└── README.md
```

## API-Endpunkte

| Methode | Pfad                     | Beschreibung                     |
|---------|--------------------------|----------------------------------|
| GET     | `/api/todos`             | Alle Todos (optional `?isDone=true/false`) |
| GET     | `/api/todos/{id}`        | Einzelnes Todo nach ID           |
| POST    | `/api/todos`             | Neues Todo anlegen               |
| PUT     | `/api/todos/{id}`        | Todo aktualisieren               |
| PATCH   | `/api/todos/{id}/done`   | Todo als erledigt markieren      |
| DELETE  | `/api/todos/{id}`        | Todo löschen                     |

## Voraussetzungen

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 20+](https://nodejs.org/)
- npm (kommt mit Node.js)

## Startanleitung

### Backend starten

```bash
cd src/Todo.Api
dotnet run
```

Die API ist erreichbar unter: **http://localhost:5062**
Swagger UI (nur im Development): **http://localhost:5062/swagger**

### Frontend starten

```bash
cd src/Todo.App
npm install    # nur beim ersten Mal
npm run dev
```

Die App ist erreichbar unter: **http://localhost:5173**

> **Hinweis:** Das Backend muss laufen, damit das Frontend Daten laden kann.

### Tests ausführen

**Backend Tests:**
```bash
dotnet test
```

**Frontend Tests:**
```bash
cd tests/Todo.App.Tests
npm install    # nur beim ersten Mal
npm test
```

## Todo-Datenmodell

| Feld        | Typ        | Beschreibung                          |
|-------------|------------|---------------------------------------|
| Id          | int        | Automatisch generierte ID             |
| Title       | string     | Pflichtfeld                           |
| Description | string?    | Optional                              |
| IsDone      | bool       | Status (offen/erledigt)               |
| Priority    | string     | "Low", "Medium" oder "High"           |
| DueDate     | DateTime?  | Optionales Fälligkeitsdatum           |
| CreatedAt   | DateTime   | Automatisch beim Erstellen gesetzt    |

## Workshop-Demos

Die Anwendung ist als Grundlage für folgende Workshop-Themen konzipiert:

| Thema              | Beschreibung                                                                 |
|--------------------|------------------------------------------------------------------------------|
| **Prototyping**    | Neues Feature (z.B. Tags) schnell prototypisieren                            |
| **Prompt Engineering** | Verschiedene Prompt-Stile vergleichen                                    |
| **Refactoring**    | Repository-Pattern einführen, Thread-Safety verbessern                       |
| **TDD**            | Red-Green-Refactor für eine Suchfunktion                                     |
| **Debugging**      | Absichtlichen Bug einbauen und mit Copilot finden                            |
| **Code Review**    | Bestehenden Code reviewen (Thread-Safety, Validierung, CORS)                 |
| **Security**       | Input-Validation, CORS, Auth-Konzepte diskutieren                            |
| **Test-Generierung** | Tests für bestehenden Code generieren lassen                               |
| **Coding Agent**   | Komplexeres Feature end-to-end umsetzen lassen                               |

Detaillierte Szenarien mit Schritt-für-Schritt-Anleitungen findest du in [`docs/workshop-scenarios.md`](docs/workshop-scenarios.md).

## Bewusste Vereinfachungen / Diskussionspunkte

Diese Punkte sind absichtlich einfach gehalten, damit sie im Workshop diskutiert werden können:

- **In-Memory-Speicherung:** Kein Datenbank-Setup nötig. Daten gehen bei Neustart verloren.
- **Thread-Safety:** `TodoService` als Singleton mit `List<T>` – nicht thread-safe.
- **Validierung:** Nur `Title` wird geprüft. Priority-Werte, Längen etc. fehlen.
- **Kein Auth:** Kein Login, keine Rollen – aber die Struktur erlaubt einfaches Nachrüsten.
- **CORS:** Offen für `localhost:5173` – müsste für Production angepasst werden.
- **Manuelles Mapping:** Model ↔ DTO ohne AutoMapper.
- **Hardcoded API-URL:** Im Frontend in `todoApi.ts` – könnte per Environment-Variable konfiguriert werden.

## Nächste sinnvolle Erweiterungen

1. **Datenbankanbindung:** Entity Framework Core mit SQLite oder PostgreSQL
2. **Suchfunktion:** Todos nach Titel durchsuchen
3. **Sortierung:** Nach Priority, DueDate oder CreatedAt
4. **Tags:** Mehrere Tags pro Todo
5. **Authentication:** JWT oder Cookie-basiert
6. **Pagination:** Bei vielen Todos
7. **Environment-Config:** API-URL per `.env` im Frontend
8. **Docker:** Containerisierung für Backend und Frontend
9. **E2E-Tests:** Playwright für End-to-End-Tests
10. **Code Coverage:** In CI-Pipeline integrieren
