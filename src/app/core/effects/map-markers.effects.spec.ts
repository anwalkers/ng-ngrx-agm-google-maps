import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MapMarkersEffects } from './map-markers.effects';

describe('MapMarkersEffects', () => {
  let actions$: Observable<any>;
  let effects: MapMarkersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapMarkersEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<MapMarkersEffects>(MapMarkersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
