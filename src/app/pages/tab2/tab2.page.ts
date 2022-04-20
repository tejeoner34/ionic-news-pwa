import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    public articles: Article[];

    isComplete = false;

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll

    public categories = [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology'
    ];

    public header: string = this.categories[0];

    constructor(private newsService: NewsService, public toastController: ToastController) { }

    ngOnInit(): void {
        this.newsService.getHeaderNews(this.categories[0]).subscribe(res => this.articles = res)
    }

    segmentChanged(event) {
        this.newsService.getHeaderNews(event.detail.value).subscribe(res => {
            this.articles = res;
            this.header = event.detail.value;
        })
    }

    async presentToast() {
        const toast = await this.toastController.create({
          message: 'You have seen it all!',
          duration: 2000
        });
        toast.present();
      }

    // loadData() {
    //     setTimeout(() => {

    //         this.newsService.getHeaderNews(this.header, true).subscribe(res => {

    //             console.log(res.isComplete)
                
    //             this.articles = res.articles;
    //             if(res.isCompleted === false){
    //                 debugger
    //                 console.log('completed')
    //             }
    //         })
            
    //     }, 2000)

    // }

    loadData() {
        setTimeout(() => {

            this.newsService.getHeaderNews(this.header, true).subscribe(res => {

                if(res.isComplete){ 
                    console.log('completed');
                    this.infiniteScroll.complete();
                    this.presentToast()
                    return
                    // return this.infiniteScroll.disabled = true;
                }
                this.articles = res.articles;
                this.infiniteScroll.complete();
            })
            
        }, 2000)

    }

}
