using MongoDB.Driver;

namespace audit-serviceee.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
