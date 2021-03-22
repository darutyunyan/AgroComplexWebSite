using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;
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

		public async Task AddOrUpdate(Location location, bool isAddMode)
		{
			Debug.Assert(location.Id != Guid.Empty);
			Debug.Assert(!string.IsNullOrEmpty(location.Lat));
			Debug.Assert(!string.IsNullOrEmpty(location.Lng));

			if (isAddMode)
			{
				await _context.Location.AddAsync(location);
				await _context.SaveChangesAsync();
			}
			else
			{
				_context.Location.Update(location);
				await _context.SaveChangesAsync();
			}
		}

		public async Task<Location> FirstOrDefault()
		{
			return await _context.Location.FirstOrDefaultAsync();
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
