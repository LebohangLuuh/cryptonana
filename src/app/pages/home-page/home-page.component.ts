import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchComponent } from '../../ui/search/search.component';
import { CountryCardComponent } from '../../ui/country-card/country-card.component';
import { CountryService } from '../../services/country.service';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [SearchComponent, CountryCardComponent, CommonModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  countryService = inject(CountryService);
  loaderService = inject(LoaderService);

  // Signals for UI states
  hasError = signal(false);

  ngOnInit(): void {
    this.loaderService.show();

    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.loaderService.hide();
        const countries: any[] = Object.entries(data);

        if (countries.length === 0) {
          this.hasError.set(true);
        } else {
          this.countryService.setCountries(countries);
          this.hasError.set(false);
        }
      },
      error: () => {
        this.loaderService.hide();
        this.hasError.set(true);
      },
    });
  }
}
