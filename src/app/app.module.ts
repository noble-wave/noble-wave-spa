import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  LucideAngularModule,
  Code2,
  Globe,
  Server,
  Database,
  Cloud,
  CloudCog,
  Workflow,
  Star,
  Layers,
  HardDrive,
  Cpu,
  Smartphone,
  Settings,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-angular';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailsComponent,
    HomeComponent,
    MainComponent,
    FooterComponent,
    AboutComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    LucideAngularModule.pick({
      Code2,
      Globe,
      Server,
      Database,
      Cloud,
      CloudCog,
      Workflow,
      Star,
      Layers,
      HardDrive,
      Cpu,
      Smartphone,
      Settings,
      Mail,
      Phone,
      MapPin,
      Linkedin,
      Twitter,
      Github,
      Instagram,
      Facebook,
      Youtube,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
