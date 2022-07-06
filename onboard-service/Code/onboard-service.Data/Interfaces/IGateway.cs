using MongoDB.Driver;

namespace onboard-service.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
