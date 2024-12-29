using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{


    public class AccountController(DataContext dataContext, ITokenService tokenService, IMapper mapper) : BaseController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO register)
        {

            if (await UserExists(register.Username)) return BadRequest("Username already exists");

            using var hmac = new HMACSHA512();

            var user = mapper.Map<Users>(register);

            user.UserName = register.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password));
            user.PasswordSalt = hmac.Key;

            dataContext.Add(user);
            await dataContext.SaveChangesAsync();
            return new UserDTO
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user),
                KnownAs = user.KnownAs
            };

        }

        private async Task<bool> UserExists(string username)
        {
            return await dataContext.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());

        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            var user = await dataContext.Users
            .Include(p => p.Photos)
            .FirstOrDefaultAsync(x => x.UserName == login.Username.ToLower());
            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid Password");


            }
            return new UserDTO
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user),
                KnownAs=user.KnownAs,
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };

        }


    }
}
