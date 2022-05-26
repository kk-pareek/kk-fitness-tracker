import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})
export class HeaderToolbarComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

}
