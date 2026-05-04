import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services';
import { APP_CONFIG, COMPANY_INFO } from '../../../config';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent {
  appConfig = APP_CONFIG;
  companyInfo = COMPANY_INFO;
  lastUpdated = 'May 4, 2026';

  constructor(public themeService: ThemeService) {}
}
