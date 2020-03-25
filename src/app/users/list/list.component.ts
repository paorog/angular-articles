import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UserListComponent implements OnInit {

  users:any
  searchby = ""

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
        .then(users => {
            this.users = users;
            console.log(this.users)
        });

    this.searchby = "name"
  }

  reloadusers() {
    this.userService.getUsers()
        .then(users => {
            this.users = users;
            console.log(this.users)
        });
  }

  search(searchkey) {

    let users = this.users;

    if (searchkey === "") {
      this.reloadusers();
    }
    {
      if (this.searchby === 'name') {
          users = users.filter((user) => {
            return user.name.toLowerCase().indexOf(searchkey) !== -1
          })
      }

      if (this.searchby === 'username') {
          users = users.filter((user) => {
            return user.username.toLowerCase().indexOf(searchkey) !== -1
          })
      }

      if (this.searchby === 'email') {
          users = users.filter((user) => {
            return user.email.toLowerCase().indexOf(searchkey) !== -1
          })
      }

      if (this.searchby === 'address') {
          users = users.filter((user) => {
            return user.address.street.toLowerCase().indexOf(searchkey) !== -1 ||
                   user.address.suite.toLowerCase().indexOf(searchkey) !== -1 ||
                   user.address.city.toLowerCase().indexOf(searchkey) !== -1 ||
                   user.address.zipcode.toLowerCase().indexOf(searchkey) !== -1 ||
                   user.address.geo.lat.toLowerCase().indexOf(searchkey) !== -1 ||
                   user.address.geo.lng.toLowerCase().indexOf(searchkey) !== -1
          })
      }
    }

    this.users = users;

    return users;
  }

  searchByCategory(searchby) {
    this.searchby = searchby;
  }

}
