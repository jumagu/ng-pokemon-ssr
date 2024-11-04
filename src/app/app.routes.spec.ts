import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to about page', async () => {
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });

  it('should navigate to pokemons list page', async () => {
    await router.navigate(['pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should navigate to pokemon page', async () => {
    await router.navigate(['pokemons/pikachu']);
    expect(location.path()).toBe('/pokemons/pikachu');
  });

  it('should navigate to about page if the route does not exist', async () => {
    await router.navigate(['unknown']);
    expect(location.path()).toBe('/about');
  });

  it('should load the proper component', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about');
    expect(aboutRoute).toBeDefined();
    const aboutComponent = (await aboutRoute?.loadComponent!()) as any;
    expect(aboutComponent.default.name).toBe('AboutPageComponent');
  });
});
