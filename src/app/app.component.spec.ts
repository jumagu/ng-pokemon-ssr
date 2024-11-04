import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let component: AppComponent;

  @Component({
    selector: 'nav-bar',
    standalone: true,
    template: `<h1>Mock of NavBarComponent</h1>`,
  })
  class MockNavBarComponent {}

  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [MockNavBarComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    // ! Recommended
    // await TestBed.configureTestingModule({
    //   imports: [AppComponent],
    //   providers: [provideRouter([])],
    // })
    //   .overrideComponent(AppComponent, {
    //     add: { imports: [MockNavBarComponent] },
    //     remove: { imports: [NavBarComponent] },
    //   })
    //   .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should render the nav-bar and router-outlet', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'pokemon-ssr' title`, () => {
    expect(compiled.querySelector('nav-bar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
