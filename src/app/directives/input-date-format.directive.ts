import { DatePipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[inputDateFormat]'
})
export class InputDateFormatDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private datePipe: DatePipe) {}


  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const formattedDate = this.datePipe.transform(value, 'yyyy-MM-dd');
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedDate);
  }
}
