import { TestBed } from '@angular/core/testing';

import { MapMarkerService } from './map-marker.service';
import { of } from 'rxjs';


describe('MapMarkerService', () => {
  const mockMarkers = [
    {
      id: 1,
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true,
      selected: false,
      icon: this.iconDeselected
    },
    {
      id: 2,
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false,
      selected: false,
      icon: this.iconDeselected
    },
    {
      id: 3,
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true,
      selected: false,
      icon: this.iconDeselected
    }
  ]
  
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapMarkerService = TestBed.get(MapMarkerService);
    expect(service).toBeTruthy();
  });

  it('should return map markers', () => {
    const service: MapMarkerService = TestBed.get(MapMarkerService);
    expect(service.getMarkers()).toBe(of(mockMarkers));
  });
});
