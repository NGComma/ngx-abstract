import { AfterViewInit, Directive } from "@angular/core";
import { AbsDirective } from "@ngcomma/ngx-abstract";

@Directive({
  selector: "[absLazyViewport]"
})
export class LazyViewportDirective extends AbsDirective implements AfterViewInit {

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      console.log(this.el);
      new IntersectionObserver(entries => {
        console.log(entries);
      }).observe(this.el);
    });
    console.log(this.templateRef);
    this.viewContainerRef.remove();
  }
}
