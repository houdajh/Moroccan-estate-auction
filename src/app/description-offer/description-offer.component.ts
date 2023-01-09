import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offre } from '../model/offre.model';
import { OffresService } from '../services/offres.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-description-offer',
  templateUrl: './description-offer.component.html',
  styleUrls: ['./description-offer.component.css']
})
export class DescriptionOfferComponent implements OnInit {
  public offres : Array<Offre> = [];
  public offreId: number;
  public offerSelected:Offre;

  constructor(private sharedService : SharedServiceService,
    private offreService: OffresService,
    private route: ActivatedRoute) { }

   ngOnInit(): void {
    this.offreId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getOffres()
   this.getOfferById(this.offreId)
    console.log(this.offerSelected)
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

  public getOfferById(id: number): void {
    this.offreService.getofferById(id).subscribe(
      (response: Offre) => {
        this.offerSelected = response;
  
        console.log(this.offerSelected);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  

}
