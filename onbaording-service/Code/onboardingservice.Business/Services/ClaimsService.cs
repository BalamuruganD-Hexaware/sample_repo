using onboardingservice.Business.Interfaces;
using onboardingservice.Data.Interfaces;
using onboardingservice.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace onboardingservice.Business.Services
{
    public class ClaimsService : IClaimsService
    {
        IClaimsRepository _ClaimsRepository;

        public ClaimsService(IClaimsRepository ClaimsRepository)
        {
           this._ClaimsRepository = ClaimsRepository;
        }
        public IEnumerable<Claims> GetAll()
        {
            return _ClaimsRepository.GetAll();
        }

        public Claims Save(Claims Claims)
        {
            _ClaimsRepository.Save(Claims);
            return Claims;
        }

        public Claims Update(string id, Claims Claims)
        {
            return _ClaimsRepository.Update(id, Claims);
        }

        public bool Delete(string id)
        {
            return _ClaimsRepository.Delete(id);
        }

    }
}
