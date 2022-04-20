import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';



@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {

    @Input() article: Article;
    @Input() index: number;

    constructor(
        private iab: InAppBrowser, 
        private platform: Platform,
        private actionSheetController: ActionSheetController,
        private socialSharing: SocialSharing,
        private storageService: StorageService
        ) { }

    ngOnInit() { }

    onOpenBrowser(){

        if(this.platform.is('ios') || this.platform.is('android')){
            const browser = this.iab.create(this.article.url);
            browser.show();
            return
        }

        window.open( this.article.url, '_blank')

    }

    onShareArticle(){
        // this.socialSharing.share(
        //     this.article.title,
        //     this.article.description,
        //     null,
        //     this.article.url
        // )
        this.socialSharing.share(
            this.article.title
        )
    }

    onToggleFavorite(){
        this.storageService.saveRemoveArticle(this.article);
    }


    // estoy aquí. Creando el botón de compartir en capacitor
    async presentActionSheet(){

        const isInfav = this.storageService.isInFav(this.article);

        const commonBtns: ActionSheetButton[] = [
            {
                cssClass: 'test',
                text: isInfav ? 'Remove Favorite' : 'Favorites',
                icon: isInfav ? 'heart' : 'heart-outline',
                handler: ()=> this.onToggleFavorite()
            },
            {
                cssClass: 'test',
                text: 'Cancel',
                icon: 'close-outline',
                role: 'cancel'
            }
        ];

        const capacitorShareButton: ActionSheetButton = {
            cssClass: 'test',
            text: "Share",
            icon: 'share-outline',
            handler: ()=> this.onShareArticle()
        };

        if(this.platform.is('capacitor')){
            commonBtns.unshift(capacitorShareButton);
        }

        const actionSheet = await this.actionSheetController.create({
            
            buttons: commonBtns
        })

        await actionSheet.present();
    }

}
