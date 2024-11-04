import { provideRouter } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { SimplePokemon } from '@/pokemons/interfaces';
import { PokemonListComponent } from './pokemon-list.component';

const MOCK_POKEMONS: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    fixture.componentRef.setInput('pokemons', MOCK_POKEMONS);
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list items correctly', () => {
    expect(compiled.querySelectorAll('pokemon-card')).toHaveSize(
      MOCK_POKEMONS.length
    );
  });
});
