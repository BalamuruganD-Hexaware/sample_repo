using NSubstitute;
using onboardingservice.Test.Framework;
using onboardingservice.Business.Services;
using onboardingservice.Data.Interfaces;

namespace onboardingservice.Test.Business.ClaimsServiceSpec
{
    public abstract class UsingClaimsServiceSpec : SpecFor<ClaimsService>
    {
        protected IClaimsRepository _claimsRepository;

        public override void Context()
        {
            _claimsRepository = Substitute.For<IClaimsRepository>();
            subject = new ClaimsService(_claimsRepository);

        }

    }
}
