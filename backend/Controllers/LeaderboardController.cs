using backend.Data;
using backend.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LeaderboardController : ControllerBase
{
    private readonly AppDbContext _db;

    public LeaderboardController(AppDbContext db)
    {
        _db = db;
    }

[HttpGet]
public async Task<IActionResult> GetLeaderboard()
{
    var visitCounts = await _db.Users
        .Select(u => new
        {
            u.DisplayName,
            CountriesVisited = _db.Visits.Count(v => v.UserId == u.Id)
        })
        .ToListAsync();

    var leaderboard = visitCounts
        .OrderByDescending(entry => entry.CountriesVisited)
        .Select(entry => new LeaderboardEntryResponse(entry.DisplayName, entry.CountriesVisited))
        .ToList();

    return Ok(leaderboard);
}
}