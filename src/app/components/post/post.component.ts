import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Output() emmiter = new EventEmitter<string>();
  @Input() postid: string;
  @Input() post: Post;

  liked = false;

  constructor(private ps: PostService, private auth: AuthService) { 

  }

  ngOnInit(): void {
    // console.log(`Post ID: ${this.postid}`)
    if(this.post.likeUids && this.post.likeUids.includes(this.auth.uid)){
      this.liked = true;
    }
  }

  onLike() {
    this.liked = true;
    
    this.emmiter.emit(this.postid);
    this.ps.likePost(this.postid).subscribe(post => {
      console.log(`Post successfuly liked!`);
    });
  }
}
