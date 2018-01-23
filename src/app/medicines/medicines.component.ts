import { Component, OnInit } from '@angular/core';
import { PresentationsService } from '../services/presentations.service';
import { Presentation } from '../models/presentation';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  presentations: Presentation[] = [];

  constructor(private presentationsService: PresentationsService) { }

  ngOnInit() {
    this.presentationsService.getPresentations().subscribe(presentations => {
      this.presentations = presentations;
    })
  }

}
