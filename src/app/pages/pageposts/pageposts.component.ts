import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../services/post.model';

@Component({
  selector: 'app-pageposts',
  templateUrl: './pageposts.component.html',
  styleUrls: ['./pageposts.component.css']
})
export class PagePostsComponent implements OnInit {

  posts$: Observable<Post>;
  posts: Post[] = [
    {
      author: 'Pedro Duquesne',
      content: 'This is my first Post!'
    },
    {
      author: 'Wilson Lozano',
      content: 'Peter encontre un bug.'
    },
    
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
