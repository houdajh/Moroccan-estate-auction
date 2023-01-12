import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offre } from '../model/offre.model';
import { OffresService } from '../services/offres.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedServiceService } from '../services/shared-service.service';
import { Appuser } from '../model/appuser.model';
import { RegistrationService } from '../services/registration.service';
import { Auction } from '../model/auction';
import { NgForm } from '@angular/forms';
import { AuctionService } from '../services/auction.service';
import { User } from '../model/user.model';
import { MapsAPILoader } from '@agm/core';
import { AgmMap } from '@agm/core';   
import { Observable } from 'rxjs';
import * as L from 'leaflet';



@Component({
  selector: 'app-description-offer',
  templateUrl: './description-offer.component.html',
  styleUrls: ['./description-offer.component.css']
})


export class DescriptionOfferComponent implements OnInit {
  //options = {
   // layers: [
       // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
  //  ],
   // zoom: 5,
   // center: L.latLng({ lat: 38.991709, lng: -76.886109 })
//};

private map;
postResponse: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

//map: L.Map;


  public offres : Array<Offre> = [];
  public users : Array<User> = [];
  public users2 : Array<User> = [];
  public auctions : Array<Auction> = [];
  public auctionsbyofferid : Array<Auction> = [];
  public offreId: number;
  public offerSelected:Offre;
  public currentuser : Appuser = new Appuser();
  public addedBid : Auction = new Auction();
  @ViewChild('myForm') form!: NgForm;
  public errors!: string [];
  private t: any;
  p:number=1;
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

 
  //map: google.maps.Map;

  //latitude: number;
  //longitude: number;
  //zoom: number;



  lat = 33.5731104;
  lng = -7.5898434;

  key:string ="id";
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse
  }

  address: string;
  coordinates: { lat: number, lng: number };



  constructor(private sharedService : SharedServiceService,
    private offreService: OffresService,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private auctionService: AuctionService,
    private mapsAPILoader: MapsAPILoader,
    private http: HttpClient) { }

    ngAfterViewInit(): void {
      this.initMap();
    }

   async ngOnInit(): Promise<void> {
   // const geocoder = new google.maps.Geocoder();
   // geocoder.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'}, (results, status) => {
     // if (status === 'OK') {
      //  const latitude = results[0].geometry.location.lat();
      //  const longitude = results[0].geometry.location.lng();
      //  console.log(`Latitude: ${latitude} - Longitude: ${longitude}`);
     // } else {
      //  console.log('Geocode was not successful for the following reason: ' + status);
      //}
    //});
  


    this.offreId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getOffres()
    await this.getCurrentUser();
    this.getAuctions()
   this.getOfferById(this.offreId)
   await this.getAuctionsbyofferid()
    console.log("gbhj,njbjhbhjn,",this.auctionsbyofferid)
    this.getUsers()


   // this.mapsAPILoader.load().then(() => {
     // let geocoder = new google.maps.Geocoder();
     // geocoder.geocode({ 'address': "Rabat"}, (results, status) => {
     //   if (status == google.maps.GeocoderStatus.OK) {
     //     this.latitude = results[0].geometry.location.lat();
     //     this.longitude = results[0].geometry.location.lng();
      //    this.zoom = 12;
      //  }
    //  });
   // });
  


    
  }


 //getCoordinates() {
    //this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=AIzaSyBItLg0F_r9WU2PorG4J-rrAYQRcfWgBJo`)
      //.subscribe((response: any) => {
       // this.coordinates = response.results[0].geometry.location;
        
     // });
      
 //}

 

  public async getCurrentUser(): Promise<void> {
    this.registrationService.getUser().subscribe(
     (response: Appuser) => {
       this.currentuser = response;
       this.getUsers()
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
  }

  public getOffres(): void {
    this.offreService.getOffers().subscribe(
      (response: Offre[]) => {
        this.offres = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getUsers(): void {
    this.registrationService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }
  public getuserbyid(id :number):string{
    for(let item of this.users){
      if(item.id==id){
        this.users2.push(item)
        return item.firstName
      }
    }
    return "none"
  }

  public async getOfferById(id: number): Promise<void> {
    this.offreService.getofferById(id).subscribe(
      (response: Offre) => {
        this.offerSelected = response;
        this.http.get('http://localhost:8889/images/get/image/info/' + this.offerSelected.imagename)
      .subscribe(
        res => {
          this.postResponse = res;
          this.offerSelected.imagename = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
      this.offerSelected.imagename='data:image/jpeg;base64,' + this.offerSelected.imagename;
      console.log("coco"+this.offerSelected.imagename)
        this.getAuctionsbyofferid()

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAuctions(): void {
    this.auctionService.getAuctions().subscribe(
      (response: Auction[]) => {
        this.auctions = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public async getAuctionsbyofferid(): Promise<void> {
    //await this.getOfferById(this.offreId)
    console.log(this.offerSelected.id)
    this.auctionService.getAuctionByofferId(this.offerSelected.id).subscribe(
      (response: Auction[]) => {
        this.auctionsbyofferid = response;
        console.log("fvgbhnj,kdfvgbn,;",this.auctionsbyofferid);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  saveBid(bid : Auction) {
    this.errors = [];
    this.auctionService.addAuction(bid)
      .subscribe(data => {
          var win_timer = setInterval(function() {

            //window.location.reload();
            clearInterval(win_timer);
            
          }, 100); this.t;
        },
        error => {
          this.errors = error.error.errors;
        });
  }

  onSubmit(){
    this.addedBid.iduser=this.currentuser.id;
    this.addedBid.price=this.form.value.bidDetails.price;
    //this.addedBid.offer=this.offerSelected;
    this.addedBid.idOffer=this.offerSelected.id;
    this.addedBid.state=false;

    console.log(this.addedBid);
    this.saveBid(this.addedBid);
   alert("Success!!");

   window.location.reload();

  }
  

}
