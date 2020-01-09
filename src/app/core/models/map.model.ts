export interface MapMarker {
  id: number;
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  selected: boolean;
  icon: string;
}

export interface MapMarkerDrag {
  marker: MapMarker;
  mouseEvent: MouseEvent;
}
