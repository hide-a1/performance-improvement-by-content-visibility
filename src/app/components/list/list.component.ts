import { afterNextRender, Component, signal } from '@angular/core';
import { getData } from '../../data';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  imports: [DetailComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  objects = getData(100);

  renderStart = signal<DOMHighResTimeStamp>(0);
  renderEnd = signal<DOMHighResTimeStamp>(0);
  renderTime = signal<DOMHighResTimeStamp>(0);

  constructor() {
    afterNextRender(() => {
      this.renderEnd.set(performance.now());
      this.renderTime.set(this.renderEnd() - this.renderStart());
    });
  }

  ngOnInit(): void {
    this.renderStart.set(performance.now());
  }

  change(position: number, event: any) {
    const _event = event as ContentVisibilityAutoStateChangeEvent;
    console.log({ position }, { skipped: _event.skipped });
  }
}
