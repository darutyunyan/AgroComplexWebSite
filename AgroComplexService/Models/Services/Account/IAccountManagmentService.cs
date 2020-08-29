using AgroComplexService.Models.DataBase;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.AccountManagment
{
    public interface IAccountManagmentService
    {
        Task<Account> GetAccount(string login, string password);

        string GetToken(Account account);
    }
}
