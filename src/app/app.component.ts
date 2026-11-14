import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {interval, Observable} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2)

  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});

  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if (timesExecuted > 2) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      subscriber.next({message: 'New value', value: 0});
      timesExecuted++;
    }, 2000)
  });

  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log('Click button: ' + this.clickCount() + ' times.')
    // });

  }

  ngOnInit() {
    // setInterval(() => {
    //   this.interval.update(prev => prev + 1);
    // }, 1000)

    // const subscription = interval(1000).pipe(
    //     map(x => x * 2)
    // ).subscribe({
    //   next: (value) => console.log(value),
    // });
    //
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
    const subscription = this.clickCount$.subscribe({
      next: (value) => console.log('Click button: ' + value + ' times.')
    });


    this.customInterval$.subscribe({
      // @ts-ignore
      next: (val) => console.log({...val, he: 'he-he'}),
      complete: () => console.log('COMPLETED')
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(prev => prev + 1);
  }
}
