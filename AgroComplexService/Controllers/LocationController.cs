using AgroComplexService.Dto;
using AgroComplexService.Dto.Client;
using AgroComplexService.Dto.Shared;
using AgroComplexService.Models.DataBase;
using AgroComplexService.Models.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgroComplexService.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class LocationController : BaseController
	{
		#region Constructor

		public LocationController(AgroComplexDBContext context) : base(context)
		{
			_locationRepo = new LocationRepository(context);
		}

		#endregion

		#region Public methods

		[Route("GetCoordinates")]
		[HttpGet]
		public async Task<Response> GetCoordinates()
		{
			GetCoordinatesRespone response = new GetCoordinatesRespone();

			try
			{
				Location location = await _locationRepo.Get();
				response.Lat = location.Lat;
				response.Lng = location.Lng;
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("AddOrUpdateCoordinates")]
		[HttpPost]
		public async Task<Response> AddOrUpdateCoordinates(AddOrUpdateCoordinatesReqeust request)
		{
			Response response = new Response();

			try
			{
				await _locationRepo.AddOrUpdate(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		#endregion

		#region Private property

		private ILocationRepository _locationRepo = null;

		#endregion
	}
}
