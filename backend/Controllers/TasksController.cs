using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static readonly List<TaskItem> Tasks = new();
        private static int NextId = 1;

        [HttpGet]
        public IActionResult GetTasks([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            var total = Tasks.Count;
            var items = Tasks
                .OrderBy(t => t.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return Ok(new { items, total });
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Title) || task.Title.Length <= 10)
                return BadRequest(new { error = "Task title must be longer than 10 characters." });
            if (string.IsNullOrWhiteSpace(task.Deadline))
                return BadRequest(new { error = "Deadline is required." });
            task.Id = NextId++;
            task.IsDone = false;
            Tasks.Add(task);
            return Created($"/api/tasks/{task.Id}", task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TaskItem updated)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            if (string.IsNullOrWhiteSpace(updated.Title) || updated.Title.Length <= 10)
                return BadRequest(new { error = "Task title must be longer than 10 characters." });
            if (string.IsNullOrWhiteSpace(updated.Deadline))
                return BadRequest(new { error = "Deadline is required." });
            task.Title = updated.Title;
            task.Deadline = updated.Deadline;
            task.IsDone = updated.IsDone;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            Tasks.Remove(task);
            return NoContent();
        }

        [HttpPost("{id}/done")]
        public IActionResult MarkAsDone(int id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            task.IsDone = true;
            return NoContent();
        }
    }
} 