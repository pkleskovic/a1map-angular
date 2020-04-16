import { Component, OnInit, ViewChild, Input, SimpleChange, OnChanges, OnDestroy } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Product } from 'src/app/models/product.model';
import { CustomerLayoutComponent } from '../customer-layout/customer-layout.component';
import { Subscription } from 'rxjs';
import { ProductExchangeService } from 'src/app/services/product-exchange.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
subscription: Subscription;
recievedProduct: Product;
icon = {
  path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
  fillColor: '#ff0000',
  fillOpacity: .6,
  anchor: new google.maps.Point(0, 0),
  strokeWeight: 0,
  scale: 0.2,
  label: 'T'
};

markerOptions = {
  zoom: 18,
  draggable: true,
  icon: this.icon // url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
};

markerPositions: google.maps.LatLngLiteral[] = [];
display ?: google.maps.LatLngLiteral;
zoom = 15;
center: google.maps.LatLngLiteral;
options: google.maps.MapOptions = {
  mapTypeId: 'hybrid'
};

markers = [];

constructor(private productService: ProductExchangeService) {
  this.subscription = productService.product$.subscribe(
    govno => {
      this.recievedProduct = govno;
      this.icon.fillColor = this.recievedProduct.icon;
    }
  );
 }

ngOnInit(): void {
  navigator.geolocation.getCurrentPosition(position => {
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  });
}

ngAfterInit(){
  // this.product.subscribe
  console.log(this.recievedProduct.name);
}

addMarker(event: google.maps.MouseEvent) {
  // console.log(this.product.name);
  console.log(this.recievedProduct.name);
  this.markerPositions.push(event.latLng.toJSON());
}

move(event: google.maps.MouseEvent) {
  this.display = event.latLng.toJSON();
}

openInfoWindow(marker: MapMarker) {
  this.infoWindow.open(marker);
}

removeLastMarker() {
  this.markerPositions.pop();
}

ngOnDestroy() {
  // prevent memory leak when component destroyed
  this.subscription.unsubscribe();
}
}
