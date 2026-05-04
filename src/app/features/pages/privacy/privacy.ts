import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services';
import { APP_CONFIG, COMPANY_INFO } from '../../../config';
import { HeaderComponent } from '../../../shared/components/header/header';
import { FooterComponent } from '../../../shared/components/footer/footer';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.html',
    styleUrl: './privacy.scss',
    imports: [HeaderComponent, FooterComponent]
})
export class PrivacyComponent {
  themeService = inject(ThemeService);

  appConfig = APP_CONFIG;
  companyInfo = COMPANY_INFO;
  lastUpdated = 'May 4, 2026';
}
