import {
  inject,
  OnInit,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About');
    this.meta.updateTag({
      name: 'description',
      content: 'Pokemon SSR is an app...',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'About',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: '',
    });
  }
}
