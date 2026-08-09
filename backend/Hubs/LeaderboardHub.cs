using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs;

[Authorize]
public class LeaderboardHub : Hub
{
    // No server-side methods needed yet — clients only listen for
    // "LeaderboardUpdated" broadcasts pushed from VisitsController.
}