import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientProductService } from 'src/app/shared/services/client-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public iSub: Subscription;
  public seeds: any = [];
  public planProtectionProducts: any = [];
  constructor(private prodServ: ClientProductService) { }

  public ngOnInit(): void {
    this.initHomePage();
  }

  public initHomePage(): void {
    this.iSub = this.prodServ.initHomePage().subscribe((res: any) => {
      if (res.serviceError == null) {
        this.seeds = [];
        res.seeds.forEach((element: any) => {
          this.seeds = this.seeds.concat(element);
        });
        this.planProtectionProducts = [];
        res.planProtectionProducts.forEach((element: any) => {
          this.planProtectionProducts = this.planProtectionProducts.concat(element);
        });
      } else {

      }
    }, ((error) => {

    }));
  }

  public ngOnDestroy(): void {
    if (this.iSub) {
      this.iSub.unsubscribe();
    }
  }

}
