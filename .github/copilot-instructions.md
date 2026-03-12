# Copilot Instructions – WorkshopDemo Todo-App

## Tech Stack

- **Backend:** ASP.NET Core 8 Web API (C#)
- **Frontend:** React 18 + TypeScript + Vite
- **Backend Tests:** xUnit + WebApplicationFactory
- **Frontend Tests:** Vitest + React Testing Library
- **CI:** GitHub Actions

## Architekturprinzipien

- Einfache, flache Architektur – kein Overengineering.
- Klare Trennung: Controller → Service → Model.
- DTOs für Request/Response, keine Domain-Objekte nach außen geben.
- In-Memory-Speicherung ist bewusst gewählt (Workshop-Kontext).
- Frontend-Komponenten sinnvoll aufteilen, aber nicht übertreiben.
- API-Zugriff über zentrale Service-Datei (`todoApi.ts`).

## Coding Standards

### C# / Backend
- Verwende sprechende Namen für Klassen, Methoden und Variablen.
- Halte Controller schlank – Logik gehört in den Service.
- Nutze `ProblemDetails` für Fehlerantworten.
- Validierung im Controller oder Service, nicht im Model.
- Logging mit `ILogger<T>` an sinnvollen Stellen.
- Kommentare nur dort, wo sie echten Mehrwert bieten.

### TypeScript / Frontend
- Typen in `types/` definieren, nicht inline.
- Komponenten als benannte Exports, nicht als Default-Exports (Ausnahme: `App`).
- Props als Interface definieren.
- Fehler- und Loading-States berücksichtigen.
- CSS-Klassen statt Inline-Styles.

## Test-Standards

### Backend (xUnit)
- Ein Testfall pro Verhalten.
- Arrange-Act-Assert Muster.
- Tests unabhängig voneinander.
- Integration Tests mit `WebApplicationFactory<Program>`.
- Keine Mocks für In-Memory-Services nötig – direkt testen.

### Frontend (Vitest + RTL)
- Teste Verhalten, nicht Implementierungsdetails.
- `userEvent` statt `fireEvent` für realistische Interaktionen.
- API-Aufrufe mocken mit `vi.mock`.
- Teste Loading- und Error-States.

## Arbeitsweise

- Kleine, iterative Änderungen bevorzugen.
- Test-First bei Verhaltensänderungen (Red-Green-Refactor).
- Keine unnötige Komplexität einführen.
- API-Änderungen immer mit angepassten Tests begleiten.
- Bei neuen Endpunkten auch die DTOs und den Service erweitern.
- README aktualisieren, wenn sich die API oder Startanleitung ändert.

## Projektstruktur

```
src/
  Todo.Api/          → ASP.NET Core Web API
  Todo.App/          → React Frontend
tests/
  Todo.Api.Tests/    → xUnit Backend Tests
  Todo.App.Tests/    → Vitest Frontend Tests
docs/
  workshop-scenarios.md → Workshop-Szenarien
```

## API-Endpunkte

| Methode | Pfad                    | Beschreibung            |
|---------|-------------------------|-------------------------|
| GET     | /api/todos              | Alle Todos (mit Filter) |
| GET     | /api/todos/{id}         | Todo nach ID            |
| POST    | /api/todos              | Neues Todo              |
| PUT     | /api/todos/{id}         | Todo aktualisieren      |
| PATCH   | /api/todos/{id}/done    | Als erledigt markieren  |
| DELETE  | /api/todos/{id}         | Todo löschen            |
