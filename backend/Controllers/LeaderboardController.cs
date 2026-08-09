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
        var leaderboard = await _db.Users
            .Select(u => new LeaderboardEntryResponse(
                u.DisplayName,
                _db.Visits.Count(v => v.UserId == u.Id)
            ))
            .OrderByDescending(entry => entry.CountriesVisited)
            .ToListAsync();

        return Ok(leaderboard);
    }
}