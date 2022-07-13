using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using onboardingservice.Entities.Entities;

namespace onboardingservice.Test.Business.ClaimsServiceSpec
{
    public class When_saving_claims : UsingClaimsServiceSpec
    {
        private Claims _result;

        private Claims _claims;

        public override void Context()
        {
            base.Context();

            _claims = new Claims
            {
                id = 44,
                name = "name"
            };

            _claimsRepository.Save(_claims).Returns(true);
        }
        public override void Because()
        {
            _result = subject.Save(_claims);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _claimsRepository.Received(1).Save(_claims);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Claims>();

            _result.ShouldBe(_claims);
        }
    }
}
