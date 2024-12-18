using System;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext dataContext,IMapper mapper) : IUserRepository
{
    public async Task<MemberDTO?> GetMemberByUsernameAsync(string username)
    {
        return await dataContext.Users
        .Where(x=>x.UserName==username)
        .ProjectTo<MemberDTO>(mapper.ConfigurationProvider).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
    {
         return await dataContext.Users
             .ProjectTo<MemberDTO>(mapper.ConfigurationProvider).ToListAsync();
    }
  

    public async Task<Users?> GetUserByIdAsync(int id)
    {
        return await dataContext.Users.FindAsync(id);
    }

    public async Task<Users?> GetUserByUsernameAsync(string username)
    {
       return  await dataContext.Users
       .Include(x=>x.Photos)
       .SingleOrDefaultAsync(x=>x.UserName==username);
    }

    public async Task<IEnumerable<Users>> GetUsersAsync()
    {
       return  await dataContext.Users
       .Include(x=>x.Photos)
       .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await dataContext.SaveChangesAsync() > 0;
    }

    public void Update(Users user)
    {
        dataContext.Entry(user).State=EntityState.Modified;
    }
}
