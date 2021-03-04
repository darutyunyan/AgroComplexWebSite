namespace AgroComplexService.Dto
{
    public class Response
    {
        public Response() { }

        public Response(Error error)
        {
			Error = error;
        }

        public Error Error { get; set; }
    }

    public class Error
    {
        public Error() { }

        public Error(string statusCode, string message)
        {
			StatusCode = statusCode;
            Message = message;
        }

        public string StatusCode { get; set; }

        public string Message { get; set; }
    }
}
