import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { DetailsComponent } from '../details/details.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports: [HeaderComponent, HomeComponent, AboutComponent, DetailsComponent, FooterComponent]
})
export class MainComponent {}
