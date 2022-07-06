using MongoDB.Driver;

namespace temp-manage-service.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
