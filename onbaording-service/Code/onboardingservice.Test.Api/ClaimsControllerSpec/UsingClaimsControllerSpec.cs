using NSubstitute;
using onboardingservice.Test.Framework;
using onboardingservice.Api.Controllers;
using onboardingservice.Business.Interfaces;


namespace onboardingservice.Test.Api.ClaimsControllerSpec
{
    public abstract class UsingClaimsControllerSpec : SpecFor<ClaimsController>
    {
        protected IClaimsService _claimsService;

        public override void Context()
        {
            _claimsService = Substitute.For<IClaimsService>();
            subject = new ClaimsController(_claimsService);

        }

    }
}
