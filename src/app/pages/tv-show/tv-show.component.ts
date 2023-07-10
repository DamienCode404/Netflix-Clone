import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from 'src/app/service/movie-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css'],
})
export class TvShowComponent implements OnInit, OnDestroy {
  tv: any[] = [];
  allTv: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getAllTvShow();
  }

  getMoviePosterUrl(posterPath: string): string {
    const basePosterUrl = 'https://image.tmdb.org/t/p/';
    const posterSize = 'w500'; // Choisissez la taille appropriée pour l'affiche

    if (posterPath) {
      return basePosterUrl + posterSize + posterPath;
    } else {
      // Retourner une URL par défaut ou une image de remplacement si nécessaire
      return 'URL de remplacement ou une URL par défaut';
    }
  }

  getAllTvShow() {
    this.subscription.add(
      this.movieService.getAllTvShows(this.currentPage).subscribe(
        (data: any) => {
          this.tv = data.results;
          this.totalPages = data.total_pages;
          this.allTv = this.allTv.concat(this.tv);
        },
        (error) => {
          console.log(
            "Une erreur s'est produite lors de la récupération des données :",
            error
          );
        }
      )
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllTvShow();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllTvShow();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
