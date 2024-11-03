import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {
  inject,
  OnInit,
  signal,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { tap } from 'rxjs';

import { Pokemon } from '@/pokemons/interfaces';
import { PokemonsService } from '@/pokemons/services/pokemons.service';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonsService);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.pokemonService
        .fetchPokemonById(id)
        .pipe(
          tap(({ name, id }) => {
            const pageTitle = `#${id} - ${name}`;
            const pageDesc = `Page of the pokemon ${name}`;

            this.title.setTitle(pageTitle);
            this.meta.updateTag({
              name: 'description',
              content: pageDesc,
            });
            this.meta.updateTag({ name: 'og:title', content: pageTitle });
            this.meta.updateTag({ name: 'og:description', content: pageDesc });
            this.meta.updateTag({
              name: 'og:image',
              content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            });
          })
        )
        .subscribe(this.pokemon.set);
  }
}
