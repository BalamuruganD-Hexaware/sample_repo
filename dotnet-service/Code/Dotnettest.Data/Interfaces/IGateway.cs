using MongoDB.Driver;

namespace Dotnettest.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
