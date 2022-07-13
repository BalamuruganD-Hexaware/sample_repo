using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using onboardingservice.Entities.Entities;


namespace onboardingservice.Test.Business.ClaimsServiceSpec
{
    public class When_updating_claims : UsingClaimsServiceSpec
    {
        private Claims _result;
        private Claims _claims;

        public override void Context()
        {
            base.Context();

            _claims = new Claims
            {
                id = 37,
                name = "name"
            };

            _claimsRepository.Update(_claims.Id, _claims).Returns(_claims);
            
        }
        public override void Because()
        {
            _result = subject.Update(_claims.Id, _claims);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _claimsRepository.Received(1).Update(_claims.Id, _claims);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Claims>();

            _result.ShouldBe(_claims);
        }
    }
}
