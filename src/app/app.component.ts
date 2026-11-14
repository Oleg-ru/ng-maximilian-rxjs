import {Component, computed, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  interval = signal(0);
  doubleInterval = computed(() => this.interval() * 2)

  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log('Click button: ' + this.clickCount() + ' times.')
    });
  }

  ngOnInit() {

    setInterval(() => {
      this.interval.update(prev => prev + 1);
    }, 1000)

    // const subscription = interval(1000).pipe(
    //     map(x => x * 2)
    // ).subscribe({
    //   next: (value) => console.log(value),
    // });
    //
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  onClick() {
    this.clickCount.update(prev => prev + 1);
  }
}
