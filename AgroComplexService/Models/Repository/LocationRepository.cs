using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
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
