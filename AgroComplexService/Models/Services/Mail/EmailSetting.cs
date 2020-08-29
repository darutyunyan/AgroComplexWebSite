namespace AgroComplexService.Models.Services.Mail
{
    public class EmailSetting
    {
        public string SenderName { get; set; }

        public int Port { get; set; }

        public string SmtpClient { get; set; }

        public string EmailFrom { get; set; }

        public string PasswordFrom { get; set; }

        public string EmailTo { get; set; }
    }
}
