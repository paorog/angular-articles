import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';


@Injectable()
export class UserService implements Resolve<any>
{
    onUserChanged: Subject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    users: User[];
    searchText: string;
    filterBy: string;

    constructor(private httpClient: HttpClient)
    {
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUsers(),
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getUsers();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getUsers();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    getUsers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.httpClient.get('http://jsonplaceholder.typicode.com/users')
                .subscribe((response: any) => {

                    this.users = response;

                    this.users = this.users.map(user => {
                        return new User(user);
                    });

                    resolve(this.users);
                }, reject);
            }
        );
    }

  getUser(id) {
      return this.httpClient.get<any>(`http://jsonplaceholder.typicode.com/users/${id}`)
                 .toPromise();
  }
}
