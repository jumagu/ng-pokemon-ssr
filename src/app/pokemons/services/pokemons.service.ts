import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, type Observable } from 'rxjs';

import { SimplePokemon, PokemonResponse, Pokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private http = inject(HttpClient);

  public fetchPokemons(page: number): Observable<SimplePokemon[]> {
    page = Math.max(0, page);
    if (page > 0) --page;

    return this.http
      .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon', {
        params: {
          offset: page * 20,
          limit: 20,
        },
      })
      .pipe(
        map((res) => {
          const pokemons: SimplePokemon[] = res.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));

          return pokemons;
        })
      );
  }

  public fetchPokemonById(id: string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
