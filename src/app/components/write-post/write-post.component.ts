import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {

  
  content: string;
  
  @Output() emmiter = new EventEmitter<string>();

  @Input()
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  makePost(){
    this.emmiter.emit(this.content);
    this.content = '';
    // this.submitted = true;
  }

}
