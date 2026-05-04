import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header';
import { HomeComponent } from '../home/home';
import { AboutComponent } from '../about/about';
import { DetailsComponent } from '../details/details';
import { FooterComponent } from '../../../shared/components/footer/footer';

@Component({
    selector: 'app-main',
    templateUrl: './main.html',
    styleUrl: './main.scss',
    imports: [HeaderComponent, HomeComponent, AboutComponent, DetailsComponent, FooterComponent]
})
export class MainComponent {}
