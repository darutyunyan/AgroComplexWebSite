namespace AgroComplexService.Dto
{
    public class Response
    {
        public Response() { }

        public Response(ServiceError error)
        {
            ServiceError = error;
        }

        public ServiceError ServiceError { get; set; }
    }

    public class ServiceError
    {
        public ServiceError() { }

        public ServiceError(int code, string message)
        {
            Code = code;
            Message = message;
        }

        public int Code { get; set; }

        public string Message { get; set; }
    }
}
