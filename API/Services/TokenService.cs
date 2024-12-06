using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration configuration) : ITokenService
{
    public string CreateToken(Users user)
    {
        var tokenKey = configuration["TokenKey"] ?? throw new Exception("Configure TokenKey in AppSetting");

        if (tokenKey.Length < 64) throw new Exception("Your token needs to be longer");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim>(){

            new Claim(ClaimTypes.NameIdentifier,user.UserName)
         };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var descriptor = new SecurityTokenDescriptor
        {

            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(descriptor);
        return tokenHandler.WriteToken(token);
    }
}
