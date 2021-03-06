using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        //cancelation token is not being used it's left as a reference.
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
            return await _mediator.Send(new List.Query(), ct);

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id, CancellationToken ct)
        {
            return await _mediator.Send(new Details.Query { Id = id }, ct);

        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);

        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });

        }
    }
}