import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from '../model/offre.model';
import { OffresService } from '../services/offres.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public offres : Array<Offre> = [];

  constructor( private offreService: OffresService ,private router : ActivatedRoute,private route : Router){}

async ngOnInit() : Promise<void>{
  this.getOffres();
}

public getOffres(): void {
  this.offreService.getOffers().subscribe(
    (response: Offre[]) => {
      this.offres = response;

      console.log(this.offres);

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

}
