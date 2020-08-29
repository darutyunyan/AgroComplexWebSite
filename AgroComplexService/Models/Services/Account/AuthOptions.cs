using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AgroComplexService.Models.Services.AccountManagment
{
    public class AuthOptions
    {
        public const string ISSUER = "ISSUER";
        public const string AUDIENCE = "AUDIENCE";
        const string KEY = "mysupersecret_secretkey!123";
        public const int LIFETIME = 3600;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
