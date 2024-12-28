using System;
using API.DTO;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfile:Profile
{
    public AutoMapperProfile( )
    {
        CreateMap<Users,MemberDTO>()
        .ForMember(m=>m.Age,o=>o.MapFrom(p=>p.DateOfBirth.CalculateAge()))
        .ForMember(m=>m.PhotoUrl,o => o.MapFrom(p=>p.Photos.FirstOrDefault(x=>x.IsMain)!.Url));
        CreateMap<Photo,PhotoDTO>();
        CreateMap<MemberUpdateDTO,Users>();
    }

}
