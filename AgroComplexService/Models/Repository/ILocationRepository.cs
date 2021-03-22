using AgroComplexService.Dto.Shared;
using AgroComplexService.Models.DataBase;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface ILocationRepository
	{
		Task AddOrUpdate(Location location, bool isAddMode);

		Task<Location> FirstOrDefault();

		Task<Location> Get();
	}
}
