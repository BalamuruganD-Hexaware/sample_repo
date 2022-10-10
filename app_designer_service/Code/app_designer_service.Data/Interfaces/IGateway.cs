using MongoDB.Driver;

namespace app_designer_service.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
