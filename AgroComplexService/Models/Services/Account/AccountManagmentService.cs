using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AgroComplexService.Models.Services.AccountManagment
{
    public class AccountManagmentService : IAccountManagmentService
    {
        #region Constructor

        public AccountManagmentService(AgroComplexDBContext context)
        {
            _context = context;
        }

        #endregion

        #region Public methods

        public async Task<Account> GetAccount(string login, string password)
        {
            if (string.IsNullOrEmpty(login))
                throw new ArgumentNullException("login");

            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException("password");

            Account account = await _context.Account
                .FirstOrDefaultAsync(x => x.Email == login && x.Password == password);

            return account;
        }

        public string GetToken(Account account)
        {
            DateTime now = DateTime.UtcNow;

            if (account == null)
                throw new ArgumentNullException("account");

            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, account.Email)
                };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(
                claims,
                "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            JwtSecurityToken jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claimsIdentity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(
                        AuthOptions.GetSymmetricSecurityKey(),
                        SecurityAlgorithms.HmacSha256)
                    );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        #endregion

        #region Private property

        private AgroComplexDBContext _context = null;

        #endregion
    }
}
