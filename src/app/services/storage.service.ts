import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _storage: Storage | null = null;
    private _localArticles = [];

    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        const storage = await this.storage.create();
        this._storage = storage;
        this.loadData();

    }

    async saveRemoveArticle(article: Article) {

        const isAlreadyInFavs = this._localArticles.find(element => element.title === article.title);

        if(isAlreadyInFavs){
            this._localArticles = this._localArticles.filter(element => element.title != article.title);
        }else{
            this._localArticles = [article, ...this._localArticles];
        }
        this._storage.set('articles', this._localArticles);
    }

    get getLocalArticles(){
        return [...this._localArticles]
    }

    async loadData(){
        try{
            const articles = await this._storage.get('articles');
            this._localArticles = articles || [];
        }catch(err){

        }
    }

    isInFav(article: Article){
        return !!this._localArticles.find(localArticle => localArticle.title === article.title)
    }


}
