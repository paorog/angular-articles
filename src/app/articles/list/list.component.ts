import { ArticleService } from '../article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ArticleListComponent implements OnInit {

  articles: any

  searchby = ""

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles()
        .then(articles => {
            this.articles = articles;
        });

    this.searchby = "author";
  }

  reloadArticles() {
    this.articleService.getArticles()
        .then(articles => {
            this.articles = articles;
        });
  }

  search(searchkey) {

    let articles = this.articles;

    if (searchkey === "") {
      this.reloadArticles();
    }
    {
      if (this.searchby === 'title') {
          articles = articles.filter((article) => {
            return article.title.toLowerCase().indexOf(searchkey) !== -1
          })
      }

      if (this.searchby === 'body') {
          articles = articles.filter((article) => {
            return article.body.toLowerCase().indexOf(searchkey) !== -1
          })
      }

      if (this.searchby === 'author') {
          articles = articles.filter((article) => {
            return article.user.toLowerCase().indexOf(searchkey) !== -1
          })
      }
    }

    this.articles = articles;

    return articles;
  }

  searchByCategory(searchby) {
    this.searchby = searchby;
  }

}
