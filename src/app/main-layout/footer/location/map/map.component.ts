import { Component, Input } from '@angular/core';
import { ICoordinates } from 'src/app/store/models/client.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input()
  public coordinates: ICoordinates;

  @Input()
  public options: ymaps.IMapOptions;

  @Input()
  public state: ymaps.IMapState;

}
