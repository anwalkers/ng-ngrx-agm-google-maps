import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MapMarker, MapMarkerDrag } from '../../';

@Component({
  selector: 'app-map',
  template: `
    <agm-map
      [latitude]="centerLat"
      [longitude]="centerLng"
      [zoom]="zoom"
      [disableDefaultUI]="false"
      [zoomControl]="false"
      (mapClick)="mapClicked($event)"
    >
      <agm-marker
        *ngFor="let m of markers; let i = index"
        (markerClick)="markerClicked(m, i)"
        [latitude]="m.lat"
        [longitude]="m.lng"
        [label]="m.label"
        [iconUrl]="m.icon"
        [markerDraggable]="m.draggable"
        (dragEnd)="dragEnd.emit({ marker: m, mouseEvent: $event })"
      >
        <agm-info-window>
          <strong>InfoWindow content</strong>
        </agm-info-window>
      </agm-marker>

      <agm-circle
        [latitude]="centerLat + 0.3"
        [longitude]="centerLng"
        [radius]="5000"
        [fillColor]="'red'"
        [circleDraggable]="true"
        [editable]="true"
      >
      </agm-circle>
    </agm-map>
  `,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // google maps zoom level
  @Input() public zoom: number;

  // initial center position for the map
  @Input() public centerLat: number;
  @Input() public centerLng: number;

  @Input()
  public set markers(markers: MapMarker[]) {
    this._markers = markers;
  }

  public get markers() {
    return this._markers;
  }

  @Output() sendMapClicked = new EventEmitter<MouseEvent>();
  @Output() markerClick = new EventEmitter<MapMarker>();
  @Output() dragEnd = new EventEmitter<MapMarkerDrag>();

  // tslint:disable-next-line: variable-name
  private _markers: MapMarker[];

  constructor() {}

  ngOnInit() {}

  public mapClicked($event: MouseEvent) {
    this.sendMapClicked.emit($event);
  }

  public markerClicked(marker: MapMarker, index: number) {
    this.markerClick.emit(marker);
  }

}
