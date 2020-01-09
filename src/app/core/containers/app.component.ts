import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MapMarker } from '../index';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../reducers';
import * as mapActions from '../actions/app.actions';
import { MapMarkerService } from '../services/map-marker.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular, NgRx, Google Maps (AGM) Demo</h1>

    <app-map
      [zoom]="zoom"
      [centerLat]="centerLat"
      [centerLng]="centerLng"
      [markers]="markers$ | async"
      (sendMapClicked)="mapClicked($event)"
      (markerClick)="markerClick($event)"
    ></app-map>

    <div>
      <h3>Markers</h3>
      <ul *ngFor="let marker of markers$ | async">
        <li>{{ JSON.stringify(marker) }}</li>
      </ul>
    </div>

    <div>
      <h3>Selected markers</h3>
      <ul *ngFor="let marker of selectedMarkers$ | async">
        <li>{{ JSON.stringify(marker) }}</li>
      </ul>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'google-test';
  JSON = JSON;

  // google maps zoom level
  public zoom = 8;

  // initial center position for the map
  public centerLat = 51.673858;
  public centerLng = 7.815982;

  public selectedMarkers$: Observable<MapMarker[]>;
  public markers$: Observable<MapMarker[]>;

  private nextIndex: number;

  constructor(
    private store: Store<fromRoot.State>,
    private mapMarkerService: MapMarkerService,
  ) {
    this.selectedMarkers$ = this.store.pipe(select(fromRoot.selectSelectedMapMarkers));
    this.markers$ = this.store.pipe(select(fromRoot.selectMapMarkers));
    this.markers$.subscribe((markers: MapMarker[]) => {
      console.log(JSON.stringify(markers));
      this.nextIndex = markers.length + 1;
    })
  }

  public ngOnInit() {
    this.store.dispatch(mapActions.loadMarkers());
  }

  public markerClick(clickedMarker: MapMarker) {
    const marker = { ...clickedMarker };

    marker.selected = !marker.selected;
    
    marker.icon = marker.selected
    ? this.mapMarkerService.iconSelected
    : this.mapMarkerService.iconDeselected;
    
    if (marker.selected) {
      this.store.dispatch(mapActions.selectMarker({ marker }));
    } else {
      this.store.dispatch(mapActions.deselectMarker({ marker }));
    }
    this.store.dispatch(mapActions.updateMarkers({ marker }));
  }

  public mapClicked($event: MouseEvent) {
    this.store.dispatch(
      mapActions.addMarker({
        marker: {
          id: this.nextIndex,
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          label: this.makeid(3),
          draggable: true,
          selected: false,
          icon: this.mapMarkerService.iconDeselected
        }
      })
    );
  }

  public markerDragEnd(m: MapMarker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  private makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
}
