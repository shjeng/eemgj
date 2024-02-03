import ResponseDto from "../response.dto";

export default interface PostSignInResponseDto extends ResponseDto{
  token: string;
  expirationTime: number;
}