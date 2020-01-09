import { Injectable } from '@angular/core';
import { MapMarker } from '../models/map.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapMarkerService {
  public iconSelected =
    'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png';
  public iconDeselected =
    'http://maps.google.com/mapfiles/kml/paddle/red-circle.png';

  constructor() {}

  public getMarkers(): Observable<MapMarker[]> {
    return of([
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
    ]);
  }
}
