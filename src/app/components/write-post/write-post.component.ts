import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {

  emmiter: EventEmitter;

  content: String;
  
  constructor() { }

  ngOnInit(): void {
  }

  makePost(){

  }

}
