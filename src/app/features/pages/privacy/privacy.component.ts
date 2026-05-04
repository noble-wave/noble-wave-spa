import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services';
import { APP_CONFIG, COMPANY_INFO } from '../../../config';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss'],
    imports: [HeaderComponent, FooterComponent]
})
export class PrivacyComponent {
  appConfig = APP_CONFIG;
  companyInfo = COMPANY_INFO;
  lastUpdated = 'May 4, 2026';

  constructor(public themeService: ThemeService) {}
}
