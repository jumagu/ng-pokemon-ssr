import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  // public isLoading = signal(true);

  // ? App reference
  // private appRef = inject(ApplicationRef);
  // ? Subscription to stable changes
  // ? App is stable when all asynchronous tasks are finished
  // private $appState = this.appRef.isStable.subscribe((isStable) =>
  //   console.log(isStable)
  // );

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1500);
  }

  // ngOnDestroy(): void {
  // this.$appState.unsubscribe();
  // }
}
