using System;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary cloudinary;
    public PhotoService(IOptions<CloudinarySettings> options)
    {
        var acc = new Account(options.Value.CloudName, options.Value.Apikey, options.Value.ApiSecret);
        cloudinary = new Cloudinary(acc);
    }
    public async Task<ImageUploadResult> AddPhotoAsync(IFormFile formFile)
    {
        var uploadResult = new ImageUploadResult();
        if (formFile.Length > 0)
        {

            using var stream = formFile.OpenReadStream();
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(formFile.FileName, stream),
                Folder = "da-net8",
                Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
            };
            uploadResult = await cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var deletionParams = new DeletionParams(publicId);
        return await cloudinary.DestroyAsync(deletionParams);
    }
}
