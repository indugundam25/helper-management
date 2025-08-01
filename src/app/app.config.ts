import { provideRouter } from '@angular/router';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideToastr(),
  ]
};
