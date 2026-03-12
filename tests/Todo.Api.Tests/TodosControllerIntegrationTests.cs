using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Todo.Api.DTOs;
using Xunit;

namespace Todo.Api.Tests;

public class TodosControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public TodosControllerIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetTodos_ReturnsSuccessAndSeedData()
    {
        var response = await _client.GetAsync("/api/todos");

        response.EnsureSuccessStatusCode();
        var todos = await response.Content.ReadFromJsonAsync<List<TodoResponse>>();
        Assert.NotNull(todos);
        Assert.NotEmpty(todos);
    }

    [Fact]
    public async Task GetTodos_WithFilterDone_ReturnsOnlyDoneTodos()
    {
        var response = await _client.GetAsync("/api/todos?isDone=true");

        response.EnsureSuccessStatusCode();
        var todos = await response.Content.ReadFromJsonAsync<List<TodoResponse>>();
        Assert.NotNull(todos);
        Assert.All(todos, t => Assert.True(t.IsDone));
    }

    [Fact]
    public async Task PostTodo_WithValidData_ReturnsCreated()
    {
        var request = new CreateTodoRequest
        {
            Title = "Integration Test Todo",
            Description = "Created by integration test",
            Priority = "High"
        };

        var response = await _client.PostAsJsonAsync("/api/todos", request);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var todo = await response.Content.ReadFromJsonAsync<TodoResponse>();
        Assert.NotNull(todo);
        Assert.Equal("Integration Test Todo", todo!.Title);
        Assert.Equal("High", todo.Priority);
    }

    [Fact]
    public async Task PostTodo_WithEmptyTitle_ReturnsBadRequest()
    {
        var request = new CreateTodoRequest { Title = "", Priority = "Medium" };

        var response = await _client.PostAsJsonAsync("/api/todos", request);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PutTodo_WithEmptyTitle_ReturnsBadRequest()
    {
        var request = new UpdateTodoRequest { Title = "", Priority = "Medium" };

        var response = await _client.PutAsJsonAsync("/api/todos/1", request);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PatchDone_WithExistingId_ReturnsOkAndSetsIsDone()
    {
        // Erst ein Todo erstellen
        var createResponse = await _client.PostAsJsonAsync("/api/todos",
            new CreateTodoRequest { Title = "Patch Test", Priority = "Medium" });
        var created = await createResponse.Content.ReadFromJsonAsync<TodoResponse>();

        // Als erledigt markieren
        var response = await _client.PatchAsync($"/api/todos/{created!.Id}/done", null);

        response.EnsureSuccessStatusCode();
        var todo = await response.Content.ReadFromJsonAsync<TodoResponse>();
        Assert.True(todo!.IsDone);
    }

    [Fact]
    public async Task DeleteTodo_WithExistingId_ReturnsNoContent()
    {
        var createResponse = await _client.PostAsJsonAsync("/api/todos",
            new CreateTodoRequest { Title = "Delete Test", Priority = "Low" });
        var created = await createResponse.Content.ReadFromJsonAsync<TodoResponse>();

        var response = await _client.DeleteAsync($"/api/todos/{created!.Id}");

        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task GetTodo_WithNonExistingId_ReturnsNotFound()
    {
        var response = await _client.GetAsync("/api/todos/99999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeleteTodo_WithNonExistingId_ReturnsNotFound()
    {
        var response = await _client.DeleteAsync("/api/todos/99999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
