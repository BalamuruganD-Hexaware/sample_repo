using MongoDB.Driver;

namespace hhhhhh.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
