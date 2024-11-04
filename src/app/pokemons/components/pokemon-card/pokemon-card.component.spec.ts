import { provideRouter } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { routes } from '@/app.routes';
import { SimplePokemon } from '@/pokemons/interfaces';
import { PokemonCardComponent } from './pokemon-card.component';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('signal input should have the value of the mockPokemon', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon and image url correctly', () => {
    const imgTag = compiled.querySelector('img');
    expect(imgTag).toBeDefined();
    expect(imgTag?.src).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`
    );
    expect(imgTag?.alt).toBe(mockPokemon.name);
  });

  it('should have proper ng-reflect-router-link and href', () => {
    const anchorTag = compiled.querySelector('a');
    expect(anchorTag?.href).toContain(`/pokemons/${mockPokemon.name}`);
    expect(anchorTag?.getAttribute('ng-reflect-router-link')).toBe(
      `/pokemons,${mockPokemon.name}`
    );
  });
});
