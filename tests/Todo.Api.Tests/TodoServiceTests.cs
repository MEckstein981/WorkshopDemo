using Todo.Api.DTOs;
using Todo.Api.Services;
using Xunit;

namespace Todo.Api.Tests;

public class TodoServiceTests
{
    private TodoService CreateService() => new();

    [Fact]
    public void AddTodo_WithValidRequest_ReturnsTodoWithId()
    {
        var service = CreateService();
        var request = new CreateTodoRequest
        {
            Title = "Test Todo",
            Description = "Test Description",
            Priority = "High"
        };

        var result = service.Add(request);

        Assert.NotNull(result);
        Assert.True(result.Id > 0);
        Assert.Equal("Test Todo", result.Title);
        Assert.Equal("Test Description", result.Description);
        Assert.Equal("High", result.Priority);
        Assert.False(result.IsDone);
    }

    [Fact]
    public void AddTodo_SetsCreatedAt()
    {
        var service = CreateService();
        var before = DateTime.UtcNow;

        var result = service.Add(new CreateTodoRequest { Title = "Timestamp Test" });

        Assert.True(result.CreatedAt >= before);
        Assert.True(result.CreatedAt <= DateTime.UtcNow);
    }

    [Fact]
    public void UpdateTodo_WithExistingId_UpdatesAndReturnsTodo()
    {
        var service = CreateService();
        var created = service.Add(new CreateTodoRequest { Title = "Original" });

        var result = service.Update(created.Id, new UpdateTodoRequest
        {
            Title = "Updated",
            Description = "New Description",
            Priority = "Low"
        });

        Assert.NotNull(result);
        Assert.Equal("Updated", result!.Title);
        Assert.Equal("New Description", result.Description);
        Assert.Equal("Low", result.Priority);
    }

    [Fact]
    public void UpdateTodo_WithNonExistingId_ReturnsNull()
    {
        var service = CreateService();

        var result = service.Update(999, new UpdateTodoRequest { Title = "Nope" });

        Assert.Null(result);
    }

    [Fact]
    public void MarkAsDone_WithExistingId_SetsIsDoneTrue()
    {
        var service = CreateService();
        var created = service.Add(new CreateTodoRequest { Title = "Mark me" });

        var result = service.MarkAsDone(created.Id);

        Assert.NotNull(result);
        Assert.True(result!.IsDone);
    }

    [Fact]
    public void MarkAsDone_WithNonExistingId_ReturnsNull()
    {
        var service = CreateService();

        var result = service.MarkAsDone(999);

        Assert.Null(result);
    }

    [Fact]
    public void GetAll_WithNoFilter_ReturnsAllTodos()
    {
        var service = CreateService();

        var todos = service.GetAll();

        Assert.NotEmpty(todos);
    }

    [Fact]
    public void GetAll_FilterByDone_ReturnsOnlyMatchingTodos()
    {
        var service = CreateService();
        var created = service.Add(new CreateTodoRequest { Title = "Done Todo" });
        service.MarkAsDone(created.Id);

        var doneTodos = service.GetAll(isDone: true);

        Assert.All(doneTodos, t => Assert.True(t.IsDone));
    }

    [Fact]
    public void GetAll_FilterByOpen_ReturnsOnlyOpenTodos()
    {
        var service = CreateService();

        var openTodos = service.GetAll(isDone: false);

        Assert.All(openTodos, t => Assert.False(t.IsDone));
    }

    [Fact]
    public void Delete_WithExistingId_ReturnsTrue()
    {
        var service = CreateService();
        var created = service.Add(new CreateTodoRequest { Title = "Delete me" });

        var result = service.Delete(created.Id);

        Assert.True(result);
        Assert.Null(service.GetById(created.Id));
    }

    [Fact]
    public void Delete_WithNonExistingId_ReturnsFalse()
    {
        var service = CreateService();

        var result = service.Delete(999);

        Assert.False(result);
    }

    [Fact]
    public void GetById_WithExistingId_ReturnsTodo()
    {
        var service = CreateService();
        var created = service.Add(new CreateTodoRequest { Title = "Find me" });

        var result = service.GetById(created.Id);

        Assert.NotNull(result);
        Assert.Equal("Find me", result!.Title);
    }

    [Fact]
    public void GetById_WithNonExistingId_ReturnsNull()
    {
        var service = CreateService();

        var result = service.GetById(999);

        Assert.Null(result);
    }
}
