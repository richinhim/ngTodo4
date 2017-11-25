import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../admin.service";
import {NewsVO} from "../../../domain/news.vo";
import {MatSnackBar} from "@angular/material";
import {ResultVO} from "../../../domain/result.vo";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModifyComponent implements OnInit {
  news: NewsVO;
  fileList: FileList;

  constructor(private route: ActivatedRoute, private adminService: AdminService,
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        const news_id = +params['news_id'];
        this.adminService.findOneNews(news_id)
          .subscribe((res: NewsVO) => {
            this.news = res;
          });
      }
    );
  }

  fileChange(event: any) {
    this.fileList = event.target.files;
    console.log(this.fileList);

    const reader = new FileReader();
    reader.readAsDataURL((this.fileList[0]));
    reader.onload = () => {

      this.imageUpload();
    };
  }

  imageUpload() {
    const formData: FormData = new FormData();
    if (this.fileList && this.fileList.length > 0) {
      const file: File = this.fileList[0];
      formData.append('file', file, file.name);
      this.adminService.imageUpload(formData)
        .subscribe(res => {
          if (res['result'] === 0) {
// 이미지 경로를 editor에 추가한다.
            console.log(res['value']);
            if (this.news.content) {
              this.news.content += `<img src="http://www.javabrain.kr${res['value']}
style="max-width: 100%;"">`;
            } else {
              this.news.content = `<img src="http://www.javabrain.kr${res['value']}"
style="max-width: 100%;">`;
            }
          }
        });
    }
  }

  modifyNews() {
    // snackbar 구현부
    if (!this.news.title) {
      this.snackBar.open("제목을 입력하세요.", null, {duration: 3000});
    }

    if (!this.news.content) {
      this.snackBar.open("내용을 입력하세요.", null, {duration: 3000});
    }

    this.adminService.modifyNews(this.news)
      .subscribe((res: ResultVO) => {
        // result 0이면 성공 스낵바 띄우고, 목록보기로 이동
        if (res.result === 0) {
          this.snackBar.open("수정하였습니다.", null, {duration: 3000});
          this.router.navigateByUrl('/admin/news');
        }
      });
  }
}
