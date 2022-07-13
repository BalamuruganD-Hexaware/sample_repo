using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using onboardingservice.Entities.Entities;

namespace onboardingservice.Test.Business.ClaimsServiceSpec
{
    public class When_getting_all_claims : UsingClaimsServiceSpec
    {
        private IEnumerable<Claims> _result;

        private IEnumerable<Claims> _all_claims;
        private Claims _claims;

        public override void Context()
        {
            base.Context();

            _claims = new Claims{
                id = 96,
                name = "name"
            };

            _all_claims = new List<Claims> { _claims};
            _claimsRepository.GetAll().Returns(_all_claims);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _claimsRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Claims>>();

            List<Claims> resultList = _result as List<Claims>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_claims);
        }
    }
}
