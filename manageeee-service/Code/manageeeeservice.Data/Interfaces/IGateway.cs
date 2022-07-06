using MongoDB.Driver;

namespace manageeeeservice.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
