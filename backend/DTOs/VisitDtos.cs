namespace backend.DTOs;

public record CreateVisitRequest(string CountryName, DateOnly VisitedOn, string? Note);
public record VisitResponse(Guid Id, string CountryName, DateOnly VisitedOn, string? Note);