using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetTasks()
        {
            return Ok(new[] { new { id = 1, title = "Sample Task", isDone = false, deadline = (string?)null } });
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] object task)
        {
            return Created("/api/tasks/1", task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] object task)
        {
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            return NoContent();
        }
    }
} 