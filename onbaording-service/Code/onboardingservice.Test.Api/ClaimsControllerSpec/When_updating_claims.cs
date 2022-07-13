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
    public class When_updating_claims : UsingClaimsControllerSpec
    {
        private ActionResult<Claims > _result;
        private Claims _claims;

        public override void Context()
        {
            base.Context();

            _claims = new Claims
            {
                id = 58,
                name = "name"
            };

            _claimsService.Update(_claims.Id, _claims).Returns(_claims);
            
        }
        public override void Because()
        {
            _result = subject.Update(_claims.Id, _claims);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _claimsService.Received(1).Update(_claims.Id, _claims);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<Claims>();

            var resultList = resultListObject as Claims;

            resultList.ShouldBe(_claims);
        }
    }
}
