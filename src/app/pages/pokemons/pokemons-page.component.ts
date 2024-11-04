import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  inject,
  signal,
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { map, tap } from 'rxjs';

import { SimplePokemon } from '@/pokemons/interfaces';
import { PokemonsService } from '@/pokemons/services/pokemons.service';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [RouterLink, PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnDestroy {
  private title = inject(Title);
  private route = inject(ActivatedRoute);
  private pokemonsService = inject(PokemonsService);

  public currentPage = signal(1);
  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);

  public queryParamSubscription = this.route.queryParamMap
    .pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
    .subscribe((page) => {
      this.currentPage.set(page);
      this.loadPokemons(page);
    });

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
  }

  public loadPokemons(page = 0) {
    this.isLoading.set(true);
    this.pokemonsService
      .fetchPokemons(page)
      .pipe(tap(() => this.title.setTitle(`Pokemons - Page ${page}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
        this.isLoading.set(false);
      });
  }
}
