using AgroComplexService.Dto.Shared;
using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public class LocationRepository : ILocationRepository
	{
		#region Constructor

		public LocationRepository(AgroComplexDBContext contect)
		{
			_context = contect;
		}

		#endregion

		#region Public methods

		public async Task AddOrUpdate(AddOrUpdateCoordinatesReqeust request)
		{
			Location location = await _context.Location.FirstOrDefaultAsync();
			if (location != null)
			{
				location.Lat = request.Lat;
				location.Lng = request.Lng;
				_context.Location.Update(location);
				await _context.SaveChangesAsync();
			}
			else
			{
				location = new Location();
				location.Id = Guid.NewGuid();
				location.Lat = request.Lat;
				location.Lng = request.Lng;

				await _context.Location.AddAsync(location);
				await _context.SaveChangesAsync();
			}
		}

		public async Task<Location> Get()
		{
			return await _context.Location.FirstAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
