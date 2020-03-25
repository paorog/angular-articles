import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Article } from './article.model';
import { User } from '../users/user.model';
import { UserService } from './../users/user.service';

@Injectable()
export class ArticleService implements Resolve<any>
{
    onArticleChanged: Subject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    user: any;
    articles = new Array();
    searchText: string;
    filterBy: string;

    constructor(private httpClient: HttpClient, private userService: UserService)
    {
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getArticles(),
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getArticles();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getArticles();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    getArticles(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.httpClient.get('http://jsonplaceholder.typicode.com/posts')
                .subscribe((articles: any) => {

                    articles.forEach(article => {

                        this.httpClient.get<any>(`http://jsonplaceholder.typicode.com/users/${article.userId}`)
                            .subscribe((user:any) => {
                              const newArticle = {
                                id: article.id,
                                user: user.name,
                                title: article.title,
                                body: article.body
                              }

                              this.articles.push(newArticle);
                            });

                    });
                    resolve(this.articles);
                }, reject);
            }
        );
    }
}
