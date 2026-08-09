using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class VisitsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IHubContext<LeaderboardHub> _hub;

    public VisitsController(AppDbContext db, IHubContext<LeaderboardHub> hub)
    {
        _db = db;
        _hub = hub;
    }

    private Guid CurrentUserId =>
        Guid.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)!);

    [HttpGet]
    public async Task<IActionResult> GetMyVisits()
    {
        var visits = await _db.Visits
            .Where(v => v.UserId == CurrentUserId)
            .Select(v => new VisitResponse(v.Id, v.CountryName, v.VisitedOn, v.Note))
            .ToListAsync();

        return Ok(visits);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateVisitRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.CountryName))
            return BadRequest("Country name is required.");
        if (request.VisitedOn > DateOnly.FromDateTime(DateTime.UtcNow))
            return BadRequest("Visit date cannot be in the future.");

        var alreadyExists = await _db.Visits
            .AnyAsync(v => v.UserId == CurrentUserId && v.CountryName == request.CountryName);
        if (alreadyExists) return Conflict("This country is already marked as visited.");

        var visit = new Visit
        {
            Id = Guid.NewGuid(),
            UserId = CurrentUserId,
            CountryName = request.CountryName,
            VisitedOn = request.VisitedOn,
            Note = request.Note,
        };

        _db.Visits.Add(visit);
        await _db.SaveChangesAsync();
        await _hub.Clients.All.SendAsync("LeaderboardUpdated");

        return Ok(new VisitResponse(visit.Id, visit.CountryName, visit.VisitedOn, visit.Note));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateVisitRequest request)
    {
        if (request.VisitedOn > DateOnly.FromDateTime(DateTime.UtcNow))
            return BadRequest("Visit date cannot be in the future.");

    var visit = await _db.Visits.FirstOrDefaultAsync(v => v.Id == id && v.UserId == CurrentUserId);
    if (visit is null) return NotFound();

    visit.VisitedOn = request.VisitedOn;
    visit.Note = request.Note;

    await _db.SaveChangesAsync();
    return Ok(new VisitResponse(visit.Id, visit.CountryName, visit.VisitedOn, visit.Note));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var visit = await _db.Visits.FirstOrDefaultAsync(v => v.Id == id && v.UserId == CurrentUserId);
        if (visit is null) return NotFound();

        _db.Visits.Remove(visit);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}