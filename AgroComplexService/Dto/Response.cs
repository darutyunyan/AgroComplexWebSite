using System.Diagnostics;

namespace AgroComplexService.Dto
{
    public class Response
    {
        public Response() { }

        public Response(ServiceError error)
        {
            Debug.Assert(error != null);

            ServiceError = error;
        }

        public ServiceError ServiceError { get; set; }
    }

    public class ServiceError
    {
        public ServiceError() { }

        public ServiceError(int code, string message)
        {
            Debug.Assert(message != null);

            Code = code;
            Message = message;
        }

        public int Code { get; set; }

        public string Message { get; set; }
    }
}
