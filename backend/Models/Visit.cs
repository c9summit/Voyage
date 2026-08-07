namespace backend.Models;

public class Visit
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string CountryName { get; set; } = string.Empty;
    public DateOnly VisitedOn { get; set; }
    public string? Note { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}