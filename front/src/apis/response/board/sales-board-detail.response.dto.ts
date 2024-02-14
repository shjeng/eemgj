import ResponseDto from "../response.dto";

export default interface SalesBoardDetailResponseDto extends ResponseDto{
	categorys: string[];
	address: string;
	title: string;
	content: string;
	salesCompleted: boolean;
	writeDateTime: string;
	salesBoardImages: string[];
	profileimg: string;
	nickname: string;
	email: string;
}