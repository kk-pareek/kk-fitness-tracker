import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})
export class HeaderToolbarComponent implements OnInit, OnDestroy {

  @Output() toggleSideNav = new EventEmitter;
  isAuth = false;
  authSubscription!: Subscription;

  constructor(private theAuthService: AuthServiceService) {}

  ngOnInit(): void {
    this.authSubscription = this.theAuthService.authStatus.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLogout() {
    this.theAuthService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
