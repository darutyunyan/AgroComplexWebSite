using AgroComplexService.Models.DataBase;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface ILogRepository
	{
		Task Add(Log log);
	}
}
