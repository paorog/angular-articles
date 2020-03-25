import { Deserializable } from './../deserializable.model';
import { User } from './../users/user.model';

export class Article

{
    id: string
    userId: number
    user: any
    title: string
    body: string

    constructor(article?)
    {
        {
            this.id = article.id || ""
            this.userId = article.userId || ""
            this.user = article.user || ""
            this.title = article.title || ""
            this.body = article.body || ""
        }
    }
}
