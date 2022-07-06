using MongoDB.Driver;

namespace app-designer-service.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
