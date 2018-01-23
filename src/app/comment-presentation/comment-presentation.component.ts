import { Component, OnInit } from '@angular/core';
import { PresentationsService } from '../services/presentations.service';
import { Presentation } from '../models/presentation';



@Component({
  selector: 'app-comment-presentation',
  templateUrl: './comment-presentation.component.html',
  styleUrls: ['./comment-presentation.component.css']
})
export class CommentPresentationComponent implements OnInit {

  presentations: Presentation[] = [];
  model: any = {};

  constructor(private presentationsService: PresentationsService) { }

  ngOnInit() {
    this.presentationsService.getPresentations().subscribe(presentations => {
      this.presentations = presentations;
    })
  }

  comment(presentionId) {
    alert("presention id-->" + JSON.stringify(presentionId));
    alert("comment text" + JSON.stringify(this.model.commentText));
  }

  help(){
    alert("Comment a presention");
  }

}