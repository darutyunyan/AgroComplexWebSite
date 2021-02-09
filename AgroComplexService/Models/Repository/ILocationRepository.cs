using AgroComplexService.Models.DataBase;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface ILocationRepository
	{
		Task<Location> Get();
	}
}
