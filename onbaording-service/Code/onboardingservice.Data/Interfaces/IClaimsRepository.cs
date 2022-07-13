using onboardingservice.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace onboardingservice.Data.Interfaces
{
    public interface IClaimsRepository : IGetAll<Claims>, ISave<Claims>, IUpdate<Claims, string>, IDelete<string>
    {
    }
}
