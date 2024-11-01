import {
  inject,
  OnInit,
  Component,
  // PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  // private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing';
    // }
    this.title.setTitle('Pricing');
    this.meta.updateTag({
      name: 'description',
      content: 'Pokemon SSR is an app...',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: '',
    });
  }
}
