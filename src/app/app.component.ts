import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log('Click button: ' + this.clickCount() + ' times.')
    });
  }

  ngOnInit() {
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
