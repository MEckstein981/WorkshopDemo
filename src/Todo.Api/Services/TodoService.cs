using Todo.Api.DTOs;
using Todo.Api.Models;

namespace Todo.Api.Services;

public class TodoService : ITodoService
{
    private readonly List<TodoItem> _todos = new();
    private int _nextId = 1;

    public TodoService()
    {
        SeedData();
    }

    private void SeedData()
    {
        _todos.AddRange(new[]
        {
            new TodoItem
            {
                Id = _nextId++,
                Title = "Workshop vorbereiten",
                Description = "Slides und Demo-Code fertigstellen",
                Priority = "High",
                DueDate = DateTime.UtcNow.AddDays(2),
                CreatedAt = DateTime.UtcNow.AddDays(-3)
            },
            new TodoItem
            {
                Id = _nextId++,
                Title = "Unit Tests schreiben",
                Description = "Tests für den TodoService implementieren",
                Priority = "High",
                DueDate = DateTime.UtcNow.AddDays(1),
                CreatedAt = DateTime.UtcNow.AddDays(-2)
            },
            new TodoItem
            {
                Id = _nextId++,
                Title = "README aktualisieren",
                Description = "Installationsanleitung ergänzen",
                Priority = "Medium",
                CreatedAt = DateTime.UtcNow.AddDays(-1)
            },
            new TodoItem
            {
                Id = _nextId++,
                Title = "Code Review durchführen",
                Description = "Pull Request vom Kollegen reviewen",
                Priority = "Low",
                DueDate = DateTime.UtcNow.AddDays(5),
                CreatedAt = DateTime.UtcNow,
                IsDone = true
            },
            new TodoItem
            {
                Id = _nextId++,
                Title = "Refactoring planen",
                Description = "Service-Schicht überarbeiten",
                Priority = "Medium",
                DueDate = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow
            }
        });
    }

    public List<TodoResponse> GetAll(bool? isDone = null)
    {
        var query = _todos.AsEnumerable();

        if (isDone.HasValue)
            query = query.Where(t => t.IsDone == isDone.Value);

        return query.Select(MapToResponse).ToList();
    }

    public TodoResponse? GetById(int id)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        return todo == null ? null : MapToResponse(todo);
    }

    public TodoResponse Add(CreateTodoRequest request)
    {
        var todo = new TodoItem
        {
            Id = _nextId++,
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate,
            CreatedAt = DateTime.UtcNow
        };

        _todos.Add(todo);
        return MapToResponse(todo);
    }

    public TodoResponse? Update(int id, UpdateTodoRequest request)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo == null) return null;

        todo.Title = request.Title;
        todo.Description = request.Description;
        todo.Priority = request.Priority;
        todo.DueDate = request.DueDate;

        return MapToResponse(todo);
    }

    public TodoResponse? MarkAsDone(int id)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo == null) return null;

        todo.IsDone = true;
        return MapToResponse(todo);
    }

    public bool Delete(int id)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo == null) return false;

        return _todos.Remove(todo);
    }

    // Workshop-Hinweis: Mapping manuell – könnte später durch AutoMapper ersetzt werden
    private static TodoResponse MapToResponse(TodoItem todo)
    {
        return new TodoResponse
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            IsDone = todo.IsDone,
            Priority = todo.Priority,
            DueDate = todo.DueDate,
            CreatedAt = todo.CreatedAt
        };
    }
}
