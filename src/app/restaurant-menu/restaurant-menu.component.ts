import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {
  menu: any[] = [];
  restaurantName: string = '';
  constructor(public dialogRef: MatDialogRef<RestaurantMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
    this.menu = this.dialogData.menu;
    this.restaurantName = this.dialogData.name
  }

  close() {
    this.dialogRef.close(false);
  }

}
