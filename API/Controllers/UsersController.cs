using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(DataContext dbContext) : ControllerBase
{

[HttpGet]
     public ActionResult<IEnumerable<Users>> GetUsers()
     {

              return dbContext.Users.ToList();

     }

     [HttpGet("{id:int}")]
     public ActionResult<Users> GetUser(int id)
     {

              var user= dbContext.Users.Find(id);

        return user == null ? NotFound() : user;
    }
}
