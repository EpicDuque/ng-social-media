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

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {

  }

  sendPost(post: Post): Promise<DocumentReference> {
    return this.afs.collection('posts').add(post);
  }

  getPosts(lim: number = 15, orderBy: string = 'time') {
    var postsRef = this.afs.collection('posts').ref;
    return postsRef.orderBy(orderBy, 'desc').limit(lim);
  }
  
}
