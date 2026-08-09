using backend.Services;
using Xunit;

namespace backend.Tests;

public class PasswordHasherTests
{
    private readonly IPasswordHasher _hasher = new PasswordHasher();

    [Fact]
    public void Hash_ProducesADifferentStringThanTheInput()
    {
        var hash = _hasher.Hash("correct horse battery staple");
        Assert.NotEqual("correct horse battery staple", hash);
    }

    [Fact]
    public void Verify_ReturnsTrue_ForTheCorrectPassword()
    {
        var hash = _hasher.Hash("correct horse battery staple");
        Assert.True(_hasher.Verify("correct horse battery staple", hash));
    }

    [Fact]
    public void Verify_ReturnsFalse_ForTheWrongPassword()
    {
        var hash = _hasher.Hash("correct horse battery staple");
        Assert.False(_hasher.Verify("wrong password", hash));
    }

    [Fact]
    public void Hash_ProducesADifferentHash_EachTime()
    {
        var hashOne = _hasher.Hash("same password");
        var hashTwo = _hasher.Hash("same password");
        Assert.NotEqual(hashOne, hashTwo);
    }
}