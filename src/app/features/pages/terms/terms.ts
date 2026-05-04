import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services';
import { APP_CONFIG, COMPANY_INFO } from '../../../config';
import { HeaderComponent } from '../../../shared/components/header/header';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.html',
    styleUrl: './terms.scss',
    imports: [HeaderComponent, RouterLink, FooterComponent]
})
export class TermsComponent {
  themeService = inject(ThemeService);

  appConfig = APP_CONFIG;
  companyInfo = COMPANY_INFO;
  lastUpdated = 'May 4, 2026';
}
