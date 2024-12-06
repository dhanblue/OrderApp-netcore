using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(DataContext dbContext) : BaseController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
    {

        return await dbContext.Users.ToListAsync();

    }
    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Users>> GetUser(int id)
    {

        var user = await dbContext.Users.FindAsync(id);

        return user == null ? NotFound() : user;
    }
}
