using onboardingservice.Data.Interfaces;
using onboardingservice.Entities.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using System;
using System.Collections.Generic;
using System.Text;

namespace onboardingservice.Data.Repositories
{
    public class ClaimsRepository : IClaimsRepository
    {
        private IGateway _gateway;
        private string _collectionName = "Claims";

        public ClaimsRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Claims> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Claims>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public bool Save(Claims entity)
        {
            _gateway.GetMongoDB().GetCollection<Claims>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Claims Update(string id, Claims entity)
        {
            var update = Builders<Claims>.Update
                .Set(e => e.id, entity.id )
                .Set(e => e.name, entity.name );

            var result = _gateway.GetMongoDB().GetCollection<Claims>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Claims>(_collectionName)
                         .DeleteOne(e => e.Id == id);
            return result.IsAcknowledged;
        }
    }
}
