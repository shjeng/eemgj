export default interface SalesBoardWriteRequestDto {
  title: string;
  content: string;
  price : number;
  categorys: string[];
  transaction: string;
  tags: string[];
  urls: string[];
}