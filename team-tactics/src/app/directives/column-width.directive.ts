import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[columnWidth]',
  standalone: true
})
export class ColumnWidthDirective {
  /**
   * Use following syntax for all regular unit types:
   *
   * "100px"
   * "5.5rem"
   *
   * Use following syntax for for flex grow behavior:
   *
   * "auto"
   */
  @Input('columnWidth') width: string = '';  // Input to accept width

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setWidth();
  }

  setWidth(): void {
    if (this.width) {
      this.el.nativeElement.style.width = this.width;  // Set the width dynamically
      this.el.nativeElement.style.minWidth = this.width;  // Set the width dynamically
      this.el.nativeElement.style.maxWidth = this.width;  // Set the width dynamically
    }
  }
}
