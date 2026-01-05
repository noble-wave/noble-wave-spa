import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LucideAngularModule } from 'lucide-angular';
import { lucideIcons } from './config';

// Feature Components
import { AboutComponent, HomeComponent, MainComponent, DetailsComponent } from './features/pages';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    LucideAngularModule.pick(lucideIcons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
