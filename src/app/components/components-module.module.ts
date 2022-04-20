import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
      NewsListComponent,
      NewsItemComponent
    ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
      NewsListComponent
  ]
})
export class ComponentsModuleModule { }
