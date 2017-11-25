import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
  MatSnackBarModule,
  MatToolbarModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AdminService} from "./admin.service";
import { ViewComponent } from './news/view/view.component';
import { WriteComponent } from './news/write/write.component';
import {CKEditorModule} from "ng2-ckeditor";
import {FormsModule} from "@angular/forms";
import { ModifyComponent } from './news/modify/modify.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    CKEditorModule,
  ],
  declarations: [AdminComponent, HomeComponent, NewsComponent, ViewComponent, WriteComponent, ModifyComponent],
  providers: [AdminService]
})
export class AdminModule { }
