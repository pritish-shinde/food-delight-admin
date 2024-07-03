import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantDetailsComponent } from './restaurant-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('RestaurantDetailsComponent', () => {
  let component: RestaurantDetailsComponent;
  let fixture: ComponentFixture<RestaurantDetailsComponent>;
  let mockRestaurantService: { getRestaurantById: { and: { returnValue: (arg0: Observable<{ id: number; name: string; description: string; location: string; contactNumber: number; email: string; openingHours: string; rating: number; menu: ({ Veg: { food: string; Price: string; }[]; NonVeg?: undefined; } | { NonVeg: { food: string; Price: string; }[]; Veg?: undefined; })[]; }>) => void; }; }; };
  let mockRouter: { navigate: any; };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '12345'
      }
    }
  };

  beforeEach(async () => {
    mockRestaurantService = jasmine.createSpyObj('RestaurantService', ['getRestaurantById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [RestaurantDetailsComponent],
      providers: [
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch restaurant details on init', () => {
    const mockData = {
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
    };

    mockRestaurantService.getRestaurantById.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.restaurant).toEqual(mockData);
    expect(mockRestaurantService.getRestaurantById).toHaveBeenCalledWith('12345');
  });

  it('should navigate back to home on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
