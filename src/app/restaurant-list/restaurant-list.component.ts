import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../model/restaurant-model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantMenuComponent } from '../restaurant-menu/restaurant-menu.component';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  allRestaurants: any;
  constructor(private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private router : Router
  ) { }
  restruantList: any = [];
  errorMessage: string = '';
  searchRestrauntName: string = '';
  pageSlice: any;
  pageNo: any=1;
  pageList: any[]=[1];
  currentPage: any=1;
  restruantPage: any=[];

  ngOnInit() {
    this.getRestaurants();
  }


  deleteRestaurant(restaurant: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '650px',
      data: { name: restaurant.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurantService.deleteRestaurant(restaurant.id).subscribe(
          () => {
            this.getRestaurants();
          },
          (error: string) => {
            this.errorMessage = error;
          }
        );
      }
    });

  }


  viewMenu(restaurant: any) {
    const dialogRef = this.dialog.open(RestaurantMenuComponent, {
      width: '470px',
      data: {menu :restaurant.menu, name : restaurant.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  addEditRestaurant(isNew:Boolean = true, details:any){
    const dialogRef = this.dialog.open(AddRestaurantComponent, {
      width: '500px',
      data: {
        isNew : isNew,
        restaurantDetails : details
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getRestaurants();
      }
    });
  }

  getRestaurants(){
    this.restaurantService.getRestaurants().subscribe(
      (data) => {
        this.restruantList = data;
        this.allRestaurants = this.restruantList.restrurantList;
        this.pagination()
      },
      (error: string) => {
        this.errorMessage = error;
      }
    );
  }

  pagination(){
    if (this.restruantList.restrurantList.length % 5 === 0) {
      this.pageNo = Math.floor(this.restruantList.restrurantList.length / 5);
    } else {
      this.pageNo = Math.floor(this.restruantList.restrurantList.length / 5) + 1;
    }
    this.onPageClick(1);
  }

    onSearch(): void {
      if (this.searchRestrauntName.trim().length > 0) {
        this.restruantList.restrurantList = [...this.restruantList.restrurantList];
        this.restruantList.restrurantList = this.allRestaurants.filter((restaurant:any) =>
          restaurant.name.toLowerCase().includes(this.searchRestrauntName.toLowerCase())
        );
      } else {
        this.restruantList.restrurantList = [...this.allRestaurants];
      }
      this.pagination();
  }
  viewDetails(restaurant: any){

  }

  
  pager(page: number) {
		let i = page + 5;
		if (i > this.pageNo) {
			this.pageList = [];
			for (let j = this.pageNo-5; j <= this.pageNo; j++) {
				if (j > 0) { this.pageList.push(j); }
			}
    console.log(this.pageList);

			return;
		}
		else {
			this.pageList = [];
		}
		for (let j = page; j <= i; j++) {
			this.pageList.push(j);
		}
	}

	onPageClick(page: number) {
		if (page > 0 && page <= this.pageNo) {
			this.currentPage = page;
			this.restruantPage = this.restruantList.restrurantList.slice(5 * (page - 1), 5 * page)
			this.pager(page)
		}
	}

}
