import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { lucideIcons } from './config';

// Feature Components
import { AboutComponent, HomeComponent, MainComponent, DetailsComponent, PrivacyComponent, TermsComponent } from './features/pages';

// Shared Components
import { HeaderComponent, FooterComponent } from './shared/components';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailsComponent,
    HomeComponent,
    MainComponent,
    FooterComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    LucideAngularModule.pick(lucideIcons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
