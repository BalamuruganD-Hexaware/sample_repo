using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using onboardingservice.Entities.Entities;

namespace onboardingservice.Test.Api.ClaimsControllerSpec
{
    public class When_getting_all_claims : UsingClaimsControllerSpec
    {
        private ActionResult<IEnumerable<Claims>> _result;

        private IEnumerable<Claims> _all_claims;
        private Claims _claims;

        public override void Context()
        {
            base.Context();

            _claims = new Claims{
                id = 81,
                name = "name"
            };

            _all_claims = new List<Claims> { _claims};
            _claimsService.GetAll().Returns(_all_claims);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _claimsService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<Claims>>();

            List<Claims> resultList = resultListObject as List<Claims>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_claims);
        }
    }
}
