using AgroComplexService.Dto.Shared;
using AgroComplexService.Models.DataBase;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface ILocationRepository
	{
		Task AddOrUpdate(AddOrUpdateCoordinatesReqeust request);

		Task<Location> Get();
	}
}
