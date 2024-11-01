import {
  inject,
  OnInit,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact');
    this.meta.updateTag({
      name: 'description',
      content: 'Pokemon SSR is an app...',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: '',
    });
  }
}
