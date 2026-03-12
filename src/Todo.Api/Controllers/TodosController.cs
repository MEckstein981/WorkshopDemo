using Microsoft.AspNetCore.Mvc;
using Todo.Api.DTOs;
using Todo.Api.Services;

namespace Todo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly ITodoService _todoService;
    private readonly ILogger<TodosController> _logger;

    public TodosController(ITodoService todoService, ILogger<TodosController> logger)
    {
        _todoService = todoService;
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<List<TodoResponse>> GetAll([FromQuery] bool? isDone)
    {
        _logger.LogInformation("Getting all todos, filter isDone={IsDone}", isDone);
        var todos = _todoService.GetAll(isDone);
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public ActionResult<TodoResponse> GetById(int id)
    {
        var todo = _todoService.GetById(id);
        if (todo == null)
        {
            _logger.LogWarning("Todo with id {Id} not found", id);
            return NotFound();
        }
        return Ok(todo);
    }

    [HttpPost]
    public ActionResult<TodoResponse> Create([FromBody] CreateTodoRequest request)
    {
        // Workshop-Hinweis: Einfache Validierung – könnte durch FluentValidation ersetzt werden
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Validation Error",
                Detail = "Title darf nicht leer sein."
            });
        }

        _logger.LogInformation("Creating new todo: {Title}", request.Title);
        var todo = _todoService.Add(request);
        return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public ActionResult<TodoResponse> Update(int id, [FromBody] UpdateTodoRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Validation Error",
                Detail = "Title darf nicht leer sein."
            });
        }

        var todo = _todoService.Update(id, request);
        if (todo == null)
        {
            return NotFound();
        }

        _logger.LogInformation("Updated todo {Id}", id);
        return Ok(todo);
    }

    [HttpPatch("{id}/done")]
    public ActionResult<TodoResponse> MarkAsDone(int id)
    {
        var todo = _todoService.MarkAsDone(id);
        if (todo == null)
        {
            return NotFound();
        }

        _logger.LogInformation("Marked todo {Id} as done", id);
        return Ok(todo);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var result = _todoService.Delete(id);
        if (!result)
        {
            return NotFound();
        }

        _logger.LogInformation("Deleted todo {Id}", id);
        return NoContent();
    }
}
