using System;
using API.DTO;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(Users user);

    Task<bool> SaveAllAsync();

    Task<IEnumerable<Users>> GetUsersAsync();

    Task<Users?> GetUserByIdAsync(int id);

    Task<Users?> GetUserByUsernameAsync(string username);

    Task<IEnumerable<MemberDTO>> GetMembersAsync();
    Task<MemberDTO?> GetMemberByUsernameAsync(string username);
}
