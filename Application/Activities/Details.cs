using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            private readonly ILogger _logger;
            public Handler(DataContext context, ILogger<Details> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // try
                // {
                //     for (var i = 0; i < 10; i++)
                //     {
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000, cancellationToken);

                //         _logger.LogInformation($"Task {i} has completed");
                //     }

                // }
                // catch (Exception ex) when (ex is TaskCanceledException)
                // {

                //     _logger.LogInformation($"Task was canceled.");
                // }
                return await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);
            }
        }

    }
}