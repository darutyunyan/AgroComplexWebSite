import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class UnSubscriber implements OnDestroy {
    public unSubscriber$: any = new Subject();

    public ngOnDestroy(): void {
        this.unSubscriber$.next();
        this.unSubscriber$.complete();
    }
}
