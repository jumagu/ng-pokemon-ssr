import { RouterLink } from '@angular/router';
import {
  input,
  computed,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SimplePokemon } from '@/pokemons/interfaces';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImg = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        this.pokemon().id
      }.png`
  );
}
