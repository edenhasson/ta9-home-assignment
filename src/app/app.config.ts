import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemReducer } from './state/reducer';
import { provideEffects } from '@ngrx/effects';
import { ItemsEffect } from './state/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              provideHttpClient(),
              provideRouter(routes),
              provideEffects(ItemsEffect),
              provideStore({items: itemReducer}), provideAnimationsAsync(),
            ]};
