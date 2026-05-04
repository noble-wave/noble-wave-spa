import { Component, OnInit, inject } from '@angular/core';
import { ThemeService } from '../../../core/services';
import { COMPANY_INFO, SOCIAL_LINKS } from '../../../config';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
    imports: [LucideAngularModule, RouterLink]
})
export class FooterComponent implements OnInit {
  themeService = inject(ThemeService);

  currentYear!: number;
  companyInfo = COMPANY_INFO;
  socialLinks = SOCIAL_LINKS;

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
