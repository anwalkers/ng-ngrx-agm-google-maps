import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './core/';
import { MapMarkersEffects } from './core/effects/map-markers.effects';
import { MapComponent } from './core/components/map/map.component';

import { ROOT_REDUCERS, metaReducers } from './reducers';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    }),
    AgmCoreModule.forRoot({
      //https://angular-maps.com/api-docs/agm-core/interfaces/lazymapsapiloaderconfigliteral
      // clientId: 'enter your client id'
      //apiKey: 'enter your api key'
    }),
    EffectsModule.forRoot([MapMarkersEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
