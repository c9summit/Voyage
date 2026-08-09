using backend.Controllers;
using backend.Data;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace backend.Tests;

public class VisitsControllerTests
{
    private static AppDbContext CreateInMemoryDb()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new AppDbContext(options);
    }

    [Fact]
    public async Task Create_RejectsAFutureVisitDate()
    {
        await using var db = CreateInMemoryDb();
        var controller = new VisitsController(db);

        var request = new CreateVisitRequest(
            "Testland",
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(5)),
            null
        );

        var result = await controller.Create(request);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task Create_RejectsAnEmptyCountryName()
    {
        await using var db = CreateInMemoryDb();
        var controller = new VisitsController(db);

        var request = new CreateVisitRequest("", DateOnly.FromDateTime(DateTime.UtcNow), null);
        var result = await controller.Create(request);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task Update_RejectsAFutureVisitDate()
    {
        await using var db = CreateInMemoryDb();
        var controller = new VisitsController(db);

        var request = new UpdateVisitRequest(
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(5)),
            null
        );

        var result = await controller.Update(Guid.NewGuid(), request);

        Assert.IsType<BadRequestObjectResult>(result);
    }
}