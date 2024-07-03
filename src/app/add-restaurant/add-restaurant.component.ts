import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent {
  restaurantForm: FormGroup;
  restaurantId: any = 123;
  isEditMode: boolean = false;;

  constructor(public dialogRef: MatDialogRef<AddRestaurantComponent>,
    private router: Router,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      openingHours: [''],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      contactNumber: [''],
      website: ['']
    });
  }

  ngOnInit() {
    this.isEditMode = this.dialogData.isNew;
    this.restaurantId = this.dialogData.restaurantDetails?.id;
    if (this.restaurantId) {
      this.isEditMode = true;
      this.restaurantForm.patchValue(this.dialogData.restaurantDetails);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    if (this.restaurantForm.invalid) {
      return;
    }
    const restaurantData: any = this.restaurantForm.value;
    if (this.isEditMode) {
      this.restaurantService.updateRestaurant(this.restaurantId!, restaurantData).subscribe((res) => {
        if (res) {
          this.dialogRef.close(true);
        }
      });
    } else {
      this.restaurantService.addRestaurant(restaurantData).subscribe((res) => {
        if (res) {
          this.dialogRef.close(true);
        }
      });
    }
  }

}
