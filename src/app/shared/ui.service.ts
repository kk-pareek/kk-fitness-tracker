import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private theSnackbar: MatSnackBar) { }

  showSnackbar(message: string, action: any, duration: number) {
    this.theSnackbar.open(message, action, {
      duration: duration
    });
  }
}
