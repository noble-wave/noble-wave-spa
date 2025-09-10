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
import { IntroComponent } from './intro/intro.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
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

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    ContactComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    HomeComponent,
    DetailsComponent,
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
