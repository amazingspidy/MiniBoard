import { Controller, Get, Post, Render, Body, Res, Param, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from './multer.options';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('closet')
export class ClosetController {

  constructor(
    private closetService: ClosetService,
  ) {}

  @Get()
  @Render('closetmain')
  async getAllCloset() {
    console.log('모든 옷장 가져오기');
    const closets = await this.closetService.getAllCloset();
    const writers = await this.closetService.getWriters();
    return {closets, writers};
  }

  @Get('createcloset')
  @Render('createcloset')
  getCreateClosetPage() {
    console.log('옷장 꾸미기 페이지 불러오기');
    // 필요한 경우, 여기에 페이지를 렌더링할 때 필요한 데이터를 추가할 수 있습니다.
  }


  @Post('createcloset')
  @Render('createcloset')
  createCloset(@Body() closetDto, @Res() res: Response ) {
    console.log('옷장꾸미기');
    this.closetService.createCloset(closetDto);
    res.send('<script type="text/javascript">alert("나의 옷장에 추가되었습니다!"); window.location="/closet";</script>');
  }


  @Get(':writer')
  @Render('privatecloset')
  async getWriterCloset(@Param('writer') writer: string) {
    const closet = await this.closetService.getClosetByWriter(writer);
    //console.log(closet);
    return {writer, closet};
  }

  @Post('file-upload') //파일업로드는 포스트만 가능.
  @UseInterceptors(FileInterceptor('file', multerOption)) //파일 인터셉터. 요청과 응답 사이의 미들웨어 파일명이 file인 파일 존재유무 확인.
  fileUpload(@UploadedFile() file: Express.Multer.File, @Body('item_id') item_id: string, @Body('writer') writer: string, @Res() res: Response) {
    console.log(file);
    console.log(item_id);
    const image_path = 'http://localhost:3000/uploads/' + file.filename;
    this.closetService.updateImage(item_id, image_path);
    res.redirect(`/closet/${writer}`);
  }
}
