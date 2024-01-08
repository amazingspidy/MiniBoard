//게시글의 타입을 인터페이스로 정의한다.
export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createdDt: Date;
  updatedDt?: Date;   // ?를 붙이면 필수값이 아니라는것.
}