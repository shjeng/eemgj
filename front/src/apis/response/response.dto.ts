import ResponseCode from "../../types/response-code.enum";

export default interface ResponseDto{
  code: ResponseCode;
  message: string;
}