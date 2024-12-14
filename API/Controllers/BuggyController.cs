using System.Runtime.CompilerServices;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController(DataContext dataContext) : ControllerBase
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {

            return "Secret-text";
        }
        [HttpGet("not-found")]
        public ActionResult<Users> GetNotfound()
        {

            var thing = dataContext.Users.Find(-1);
            if (thing == null) return NotFound();
            return thing;
        }
        [HttpGet("server-error")]
        public ActionResult<Users> GetServerError()
        {
            var thing = dataContext.Users.Find(-1) ?? throw new Exception("A bad thing has happened");

            return thing;
            
        }
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {

            return BadRequest("This was not a good request");
        }
    }
}
