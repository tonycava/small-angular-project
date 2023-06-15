import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <div *ngIf="isLoading" class="loading">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
}
