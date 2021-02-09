import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoordinates } from 'src/app/store/models/client.model';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public coordinates$: Observable<ICoordinates>;
  public options: ymaps.IMapOptions;
  public state: ymaps.IMapState;

  constructor(private store: Store<IClientState>) { }

  public ngOnInit(): void {

    this.options = {
      restrictMapArea: true,
      copyrightLogoVisible: false,
      copyrightProvidersVisible: false,
      copyrightUaVisible: false,
    };

    this.state = {
      controls: []
    };

    this.coordinates$ = this.store.select(s => s.locationState.coordinates);
  }
}
