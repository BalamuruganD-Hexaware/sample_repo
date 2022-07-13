using onboardingservice.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace onboardingservice.Business.Interfaces
{
    public interface IClaimsService
    {      
        IEnumerable<Claims> GetAll();
        Claims Save(Claims classification);
        Claims Update(string id, Claims classification);
        bool Delete(string id);

    }
}
