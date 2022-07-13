using MongoDB.Driver;

namespace onboardingservice.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
