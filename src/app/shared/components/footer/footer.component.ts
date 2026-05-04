import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services';
import { COMPANY_INFO, SOCIAL_LINKS } from '../../../config';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [LucideAngularModule, RouterLink]
})
export class FooterComponent {
  currentYear!: number;
  companyInfo = COMPANY_INFO;
  socialLinks = SOCIAL_LINKS;

  constructor(public themeService: ThemeService) {}

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
