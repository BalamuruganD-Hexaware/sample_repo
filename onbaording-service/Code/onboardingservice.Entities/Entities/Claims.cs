using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace onboardingservice.Entities.Entities
{
    [BsonIgnoreExtraElements]
    public class Claims
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public int id  { get; set; }
        public string name  { get; set; }
        
    }

}
