# Workshop-Szenarien

Dieses Dokument enthält konkrete Szenarien für den GitHub-Copilot-Workshop. Jedes Szenario kann als Hands-on-Übung durchgeführt werden.

---

## 1. Prototyping

**Ziel:** Schnell eine neue Funktion prototypisieren.

**Aufgabe:** Füge ein neues Feld `Tags` (Liste von Strings) zum Todo-Model hinzu.

**Schritte:**
1. Lasse Copilot das Model `TodoItem` um ein `Tags`-Feld erweitern.
2. Passe die DTOs (`CreateTodoRequest`, `UpdateTodoRequest`, `TodoResponse`) an.
3. Erweitere den Service und den Controller.
4. Zeige die Tags im Frontend an.

**Diskussionspunkte:**
- Wie gut versteht Copilot den bestehenden Code-Kontext?
- Welche Prompts führen zu den besten Ergebnissen?

---

## 2. Refactoring

**Ziel:** Bestehenden Code verbessern, ohne das Verhalten zu ändern.

**Aufgabe A:** Extrahiere die Validierungslogik aus dem Controller in eine eigene Methode oder Klasse.

**Aufgabe B:** Führe ein Repository-Pattern ein, um den `TodoService` von der Speicherlogik zu entkoppeln.

**Aufgabe C:** Der `TodoService` nutzt eine einfache `List<T>` – ist das thread-safe für einen Singleton-Service? Lasse Copilot die Thread-Safety verbessern.

**Diskussionspunkte:**
- Erzeugt Copilot konsistente Refactoring-Vorschläge?
- Bleiben die Tests nach dem Refactoring grün?
- Wie hilft Copilot beim Identifizieren von Code Smells?

---

## 3. TDD (Test-Driven Development)

**Ziel:** Red-Green-Refactor mit Copilot.

**Aufgabe:** Implementiere eine Suchfunktion für Todos (Titel-Suche).

**Schritte:**
1. Schreibe zuerst den Test: `SearchByTitle_ReturnsMatchingTodos`
2. Lasse Copilot den Test ergänzen (Red).
3. Implementiere die Funktion im Service (Green).
4. Refactore bei Bedarf.
5. Erweitere mit einem API-Endpunkt `GET /api/todos?search=text`.

**Diskussionspunkte:**
- Generiert Copilot sinnvolle Tests, wenn man den Testnamen vorgibt?
- Wie gut leitet Copilot die Implementierung aus dem Test ab?

---

## 4. Debugging

**Ziel:** Einen Bug finden und beheben.

**Szenario A:** Füge absichtlich einen Bug ein: In `MarkAsDone` wird `IsDone = false` statt `true` gesetzt. Lasse Teilnehmer den Bug mit Copilot finden.

**Szenario B:** Die PATCH-Route `/api/todos/{id}/done` setzt `IsDone` auf `true`, kann aber nicht rückgängig gemacht werden. Diskutiere und implementiere eine Toggle-Lösung.

**Szenario C:** Was passiert, wenn der Frontend-API-Service einen Netzwerkfehler bekommt? Teste das Fehlerverhalten.

**Diskussionspunkte:**
- Wie kann Copilot beim Debugging unterstützen?
- "/fix" und "/explain" Befehle nutzen.

---

## 5. Code Review

**Ziel:** Code-Qualität bewerten und verbessern.

**Aufgabe:** Reviewe den bestehenden Code und identifiziere Verbesserungsmöglichkeiten.

**Potenzielle Findings:**
- **Thread-Safety:** `TodoService` als Singleton mit `List<T>` – nicht thread-safe.
- **Validierung:** Nur `Title` wird geprüft. Was ist mit `Priority`-Werten? Maximale Länge?
- **Error Handling:** Was passiert bei ungültigem JSON im Request Body?
- **Mapping:** Manuelles Mapping zwischen Model und DTO – fehleranfällig?
- **CORS:** `AllowAnyHeader()` und `AllowAnyMethod()` in Production?
- **API-Design:** PATCH `/done` kann nicht rückgängig gemacht werden.
- **Frontend:** Hardcoded API-URL in `todoApi.ts`.

**Diskussionspunkte:**
- Welche Review-Kommentare generiert Copilot?
- Stimmen diese mit manuellen Findings überein?
- Wie priorisiert man die Findings?

---

## 6. Security Review

**Ziel:** Sicherheitslücken identifizieren und beheben.

**Aufgabe:** Analysiere die Anwendung auf Sicherheitsprobleme.

**Potenzielle Findings:**
- **Kein Auth/AuthZ:** Jeder kann alle Todos lesen/ändern/löschen.
- **CORS zu offen:** Nur für Development geeignet.
- **Input Validation:** Keine Längenbeschränkung bei Title/Description (DoS-Vektor).
- **XSS:** Werden Benutzereingaben im Frontend escaped? (React macht das automatisch, aber gut zu diskutieren.)
- **Rate Limiting:** Kein Schutz gegen Massenrequests.
- **Information Disclosure:** Swagger in Production?
- **HTTPS:** Nur HTTP konfiguriert.

**Übung:**
1. Lasse Copilot eine Security-Analyse durchführen.
2. Implementiere Input-Validation mit Längenbeschränkungen.
3. Konfiguriere CORS für Production.
4. Füge einen einfachen API-Key-Header hinzu (als Diskussionsgrundlage).

---

## 7. Test-Generierung

**Ziel:** Copilot generiert Tests für bestehenden Code.

**Aufgabe:** Öffne `TodoService.cs` und lasse Copilot zusätzliche Testfälle generieren.

**Mögliche neue Tests:**
- `AddTodo_WithDefaultPriority_SetsMedium`
- `UpdateTodo_DoesNotChangeCreatedAt`
- `UpdateTodo_DoesNotChangeIsDone`
- `GetAll_AfterDelete_DoesNotContainDeletedTodo`
- `SeedData_ContainsFiveItems`

**Diskussionspunkte:**
- Wie vollständig sind die generierten Tests?
- Erkennt Copilot Edge Cases?
- Wie sinnvoll sind die Testnamen?

---

## 8. (Optional) Coding Agent

**Ziel:** Ein komplexeres Feature end-to-end durch den Agent umsetzen lassen.

**Aufgabe:** "Füge eine Sortierfunktion für Todos hinzu. Todos sollen nach Priority, DueDate oder CreatedAt sortiert werden können. Implementiere Backend-Endpunkt, Frontend-UI und Tests."

**Erwartetes Ergebnis:**
- Neuer Query-Parameter `sortBy` im GET-Endpunkt.
- Dropdown im Frontend.
- Backend- und Frontend-Tests.

**Diskussionspunkte:**
- Wie gut plant der Agent die Umsetzung?
- Wie vollständig ist das Ergebnis?
- Wo muss manuell nachgebessert werden?

---

## 9. (Optional) CI/CD

**Ziel:** Die CI-Pipeline erweitern.

**Aufgabe:** Erweitere die bestehende GitHub Actions Pipeline um:
- Code Coverage Report
- Lint-Check für das Frontend
- Automatisches Deployment (z. B. Azure Web App)

**Diskussionspunkte:**
- Kann Copilot sinnvolle CI/CD-Konfigurationen generieren?
- Wie geht man mit Secrets und Konfiguration um?
