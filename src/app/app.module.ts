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
  Cloud,
  Star,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Award,
  Users,
  Headphones,
  Shield,
  Clock,
  Linkedin,
  Twitter,
  Github,
  Facebook,
} from 'lucide-angular';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailsComponent,
    HomeComponent,
    MainComponent,
    FooterComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    LucideAngularModule.pick({
      Cloud,
      Star,
      Cpu,
      Mail,
      Phone,
      MapPin,
      Award,
      Users,
      Headphones,
      Shield,
      Clock,
      Linkedin,
      Twitter,
      Github,
      Facebook,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
