import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { User } from '../models/user.model'
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthService,
  ) {

  }

  updatePost(data, id: string): Promise<void> {
    return this.afs.collection('posts').doc(id).set(data, {merge: true});
  }

  sendPost(post: Post): Promise<DocumentReference> {
    return this.afs.collection('posts').add(post);
  }

  getPosts(lim: number = 15, orderBy: string = 'time') {
    var postsRef = this.afs.collection('posts').ref;
    return postsRef.orderBy(orderBy, 'desc').limit(lim);
  }
  
  likePost(id) {
    var postRef = this.afs.collection('posts').doc<Post>(id);

    postRef.get().subscribe(post => {
      if(!post.exists) return;
      
      var data = post.data();

      if(!data.likeUids) data.likeUids = [];

      data.likeUids.push(this.auth.uid);
      data.likes += 1;

      this.updatePost(data, post.id);
    })

    return postRef.valueChanges();
  }
}
