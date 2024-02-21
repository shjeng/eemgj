import {SalesBoardDetail, Writer } from "../../../types/board";
import ResponseDto from "../response.dto";

export default interface SalesBoardDetailResponseDto extends ResponseDto{
	salesBoardDetail: SalesBoardDetail;
	writer:Writer;
}