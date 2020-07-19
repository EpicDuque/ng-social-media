import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-pageposts',
  templateUrl: './pageposts.component.html',
  styleUrls: ['./pageposts.component.css']
})
export class PagePostsComponent implements OnInit {

  posts = [];
  postsQuery: firebase.firestore.Query<firebase.firestore.DocumentData>;

  submitted = false;

  constructor(private auth: AuthService, private ps: PostService) { }

  ngOnInit(): void {
    
    this.postsQuery = this.ps.getPosts(5, 'time');

    this.postsQuery.onSnapshot(snap => {
      this.posts = [];

      if(snap.docs.length > 0){

        snap.docs.forEach(doc => {
          this.posts.push(doc.data());
        })
      }
    })

  }

  onSubmitPost(content: string) {

    var post: Post = {
      content: content,
      author: this.auth.displayName,
      time: Date.now(),
      likes: 0,
    }

    this.ps.sendPost(post).then(doc => {
      console.log(`Post sent succesfully! Doc ID: ${doc.id}`);
    });
  }
}
