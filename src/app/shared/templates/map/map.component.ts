import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoordinates } from 'src/app/store/models/client.model';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  public zoom: number;

  @Input()
  public options: ymaps.IMapOptions;

  @Input()
  public state: ymaps.IMapState;

  @Input()
  public mapSize: string;

  public coordinates$: Observable<ICoordinates>;
  
  constructor(private store: Store<IClientState>) { }

  public ngOnInit(): void {
    this.coordinates$ = this.store.select(s => s.locationState.coordinates);
  }

  public getMapSize(): string {
    return this.mapSize;
  }
}
