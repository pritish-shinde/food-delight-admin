import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent {
  restaurant: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService
  ) { }

  data =
    {
      "id": 12234,
      "name": "Restaurant Top 1",
      "description": "This is the top Restaurant. We serve Veg and Non-Veg Foods.",
      "location": "North Mumbai",
      "contactNumber": 9402894529,
      "email": "restaurant@restauranttop1.com",
      "openingHours": "Mon-Sun: 9AM-10PM",
      "rating": 4.5,
      "menu": [
        {
          "Veg": [
            {
              "food": "Veg Burger",
              "Price": "$3"
            },
            {
              "food": "Pav Bhaji",
              "Price": "$2"
            }
          ]
        },
        {
          "NonVeg": [
            {
              "food": "Chicken Burger",
              "Price": "$4"
            },
            {
              "food": "Chicken Soup",
              "Price": "$2"
            }
          ]
        }
      ]
    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchRestaurantDetails(id);
  }

  fetchRestaurantDetails(id: string | null): void {
    if (id) {
      this.restaurantService.getRestaurantById(id).subscribe((data: any) => {
        this.restaurant = data;
      });
    }
    this.restaurant = this.data;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
