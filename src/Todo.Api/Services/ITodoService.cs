using Todo.Api.DTOs;

namespace Todo.Api.Services;

public interface ITodoService
{
    List<TodoResponse> GetAll(bool? isDone = null);
    TodoResponse? GetById(int id);
    TodoResponse Add(CreateTodoRequest request);
    TodoResponse? Update(int id, UpdateTodoRequest request);
    TodoResponse? MarkAsDone(int id);
    bool Delete(int id);
}
