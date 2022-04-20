import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, ArticlesByCategory, News } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { storedArticlesByCategory } from '../data/mock-news';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    headersUrl = 'https://saurav.tech/NewsAPI/top-headlines/category';

    private articlesByCategory: ArticlesByCategory = storedArticlesByCategory

    numberOfResults = 20;

    constructor(private http: HttpClient) { }



    // podemos usar el pipe para alterar los datos de la respuesta usando en este caso el map de rxjs
    // solo funciona cuando es lo que estamos retornando
    getNews(url): Observable<Article[]> {

        // le pongo este return para hacerlo sin llamada fetch. El normal es el de debajo
        return of(this.articlesByCategory['business'].articles)

        return this.http.get<News>(url)
            .pipe(
                map(({ articles }) => articles)
            )
    }

    getHeaderNews(category, loadMore = false): Observable<any> {

        //Añado este return al no hacerlo con fetch e infinte scroll

        return of(this.articlesByCategory[category].articles)

        //Para cuando lo estaba haciendo con llamada fetch e infinite scroll
        if(loadMore){
            return this.http.get<News>(`${this.headersUrl}/${category}/us.json`).pipe(
                map(({articles})=> {
                    const articlesToAdd = articles.splice(this.articlesByCategory[category].articles.length,this.numberOfResults)
                    
                    this.articlesByCategory[category].articles.push(...articlesToAdd);
                    if(articlesToAdd.length === 0){
                        this.articlesByCategory[category].isComplete = true;
                        return this.articlesByCategory[category]
                    }else{
                        return this.articlesByCategory[category] 
                    }
                      
                })
            )
        }
        return this.setArticlesByCategories(category);
    }



    setArticlesByCategories(category):Observable<Article[]>{


        // para cuando lo estaba haciendo con llamada fetch y infinite scroll 

        // if(this.articlesByCategory[category] === undefined){

        //     this.articlesByCategory[category] = {
        //         articles: [],
        //         isComplete: false
        //     }

        //     return this.http.get<News>(`${this.headersUrl}/${category}/us.json`).pipe(
        //         map(({articles})=> {
        //             const articlesToAdd = articles.splice(0,this.numberOfResults)
        //             this.articlesByCategory[category].articles.push(...articlesToAdd);
        //             return articlesToAdd   
        //         })
        //     )
        // }
        return of(this.articlesByCategory[category].articles)
    }
}
