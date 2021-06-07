import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'widget-component',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  content?: string;

  constructor() { }

  ngOnInit(): void {
    this.content = "This is a widget!";
  }
}