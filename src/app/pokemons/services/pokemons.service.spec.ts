import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { catchError } from 'rxjs';

import { PokemonsService } from './pokemons.service';
import { PokemonResponse, SimplePokemon } from '../interfaces';

const MOCK_POKEMONS: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const MOCK_API_RES_POKEMONS: PokemonResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const MOCK_POKEMON_API = {
  id: 1,
  name: 'bulbasaur',
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PokemonsService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify if there are no pending request
    mockHttp.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch first page of pokemons', () => {
    service.fetchPokemons(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(MOCK_POKEMONS);
    });

    const req = mockHttp.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
    );

    expect(req.request.method).toBe('GET');

    req.flush(MOCK_API_RES_POKEMONS);
  });

  it('should fetch fifth page of pokemons', () => {
    service.fetchPokemons(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(MOCK_POKEMONS);
    });

    const req = mockHttp.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=80&limit=20'
    );

    expect(req.request.method).toBe('GET');

    req.flush(MOCK_API_RES_POKEMONS);
  });

  it('should fetch a pokemon by its id', () => {
    const id = 'bulbasaur';

    service.fetchPokemonById(id).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(MOCK_POKEMON_API);
    });

    const req = mockHttp.expectOne(`https://pokeapi.co/api/v2/pokemon/${id}`);

    expect(req.request.method).toBe('GET');

    req.flush(MOCK_POKEMON_API);
  });

  it('should catch error if pokemon is not found', () => {
    const id = 'e6ed9be3';

    service
      .fetchPokemonById(id)
      .pipe(
        catchError((error) => {
          expect(error.statusText).toBe('Not Found');

          return [];
        })
      )
      .subscribe((pokemon: any) => {
        // Not reached
        console.log(pokemon);
        expect(pokemon).toBeUndefined();
      });

    const req = mockHttp.expectOne(`https://pokeapi.co/api/v2/pokemon/${id}`);

    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found', { status: 404, statusText: 'Not Found' });
  });
});
