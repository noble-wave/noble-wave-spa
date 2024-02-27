import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  currentYear!: number;

  ngOnInit(): void {
    this.updateYear();
  }

  updateYear(): void {
    this.currentYear = new Date().getFullYear();
  }
}
