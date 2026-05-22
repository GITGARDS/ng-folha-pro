import { AfterViewInit, Directive, ElementRef, Input, OnInit } from "@angular/core";
import { CountUp } from "countup.js";

@Directive({
  selector: '[appCountUpDirective]',
})
export class CountUpDirective implements OnInit, AfterViewInit {
  @Input('appCountUpDirective') endVal!: number;
  @Input() duration: number = 2;
  private countUp!: CountUp;

  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    this.countUp = new CountUp(this.el.nativeElement, this.endVal, {
      duration: this.duration,
    });
    this.countUp.start();
  }
  ngAfterViewInit(): void {
    if (!this.countUp.error) {
      this.countUp.start();
    } else {
      console.error(this.countUp.error);
    }
  }
}
