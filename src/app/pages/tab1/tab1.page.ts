import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    articles: Article[] = [];

    constructor(private newsServices: NewsService) { }

    ngOnInit(): void {
        this.newsServices.getNews('https://saurav.tech/NewsAPI/everything/cnn.json')
            .subscribe(res => this.articles = res)
    }

}
