import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  currentYear!: number;

  ngOnInit(): void {
    this.updateYear();
    setInterval(() => {
      this.updateYear();
    }, 1000);
  }

  updateYear(): void {
    this.currentYear = new Date().getFullYear();
  }
}


