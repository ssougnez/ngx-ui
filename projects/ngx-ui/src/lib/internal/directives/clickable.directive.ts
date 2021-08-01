import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ngx-ui-clickable]',
  host: {
    '[tabIndex]': '0'
  }
})
export class ClickableDirective {

  @Output()
  public used: EventEmitter<Event> = new EventEmitter<Event>();

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    this.used.emit(event);
  }

  @HostListener('keydown.enter', ['$event'])
  public onEnter(event: MouseEvent) {
    this.used.emit(event);
  }

  @HostListener('keydown.space', ['$event'])
  public onSpace(event: MouseEvent) {
    event.preventDefault();

    this.used.emit(event);
  }

}
