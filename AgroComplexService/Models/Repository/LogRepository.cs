using AgroComplexService.Models.DataBase;
using System.Diagnostics;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public class LogRepository : ILogRepository
	{
		#region Constructor

		public LogRepository(AgroComplexDBContext contect)
		{
			_context = contect;
		}

		#endregion

		#region Public methods

		public async Task Add(Log log)
		{
			Debug.Assert(log != null);

			await _context.Log.AddAsync(log);
			await _context.SaveChangesAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
