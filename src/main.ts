import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

/**
 * The entry point of the application,
 * this the config the services to be available by injection in entire application, for example HttpClient
 */
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), importProvidersFrom(BrowserAnimationsModule)],
}).catch((err) => console.error(err));
