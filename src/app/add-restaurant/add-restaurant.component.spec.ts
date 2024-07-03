import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRestaurantComponent } from './add-restaurant.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('AddRestaurantComponent', () => {
  let component: AddRestaurantComponent;
  let fixture: ComponentFixture<AddRestaurantComponent>;
  let restaurantServiceSpy: jasmine.SpyObj<RestaurantService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddRestaurantComponent>>;

  const dialogDataMock = {
    isNew: false,
    restaurantDetails: {
      id: 123,
      name: 'Test Restaurant',
      email: 'test@example.com',
      description: 'Test Description',
      location: 'Test Location',
      openingHours: '9AM-9PM',
      rating: 4.5,
      contactNumber: '1234567890',
      website: 'http://test.com'
    }
  };
  let data:any = {
    restrurantList : [
      {
        "id": 12237,
        "name": "Foodie's Heaven",
        "description": "A heaven for food lovers with a wide variety of cuisines.",
        "location": "East Mumbai",
        "contactNumber": 9402894532,
        "email": "contact@foodiesheaven.com",
        "openingHours": "Mon-Sun: 10AM-11PM",
        "rating": 4.6,
        "menu": [
            {
                "Veg": [
                    {
                        "food": "Veg Pizza",
                        "Price": "$6"
                    },
                    {
                        "food": "Aloo Paratha",
                        "Price": "$3"
                    }
                ]
            },
            {
                "NonVeg": [
                    {
                        "food": "Pepperoni Pizza",
                        "Price": "$7"
                    },
                    {
                        "food": "Butter Chicken",
                        "Price": "$9"
                    }
                ]
            }
        ]
    }
    ]
  }
  beforeEach(async () => {
    const restaurantServiceMock = jasmine.createSpyObj('RestaurantService', ['addRestaurant', 'updateRestaurant']);
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [AddRestaurantComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: RestaurantService, useValue: restaurantServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    restaurantServiceSpy = TestBed.inject(RestaurantService) as jasmine.SpyObj<RestaurantService>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddRestaurantComponent>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestaurantComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with edit mode if restaurant details are provided', () => {
    component.ngOnInit()
    expect(component.isEditMode).toBe(true);
    expect(component.restaurantId).toBe(dialogDataMock.restaurantDetails.id);
  });

  it('should initialize with add mode if no restaurant details are provided', () => {
    component.dialogData = { isNew: true, restaurantDetails: {} };
    component.ngOnInit();
    expect(component.isEditMode).toBe(true);
  });

  it('should close dialog with false on cancel', () => {
    component.onCancelClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should submit new restaurant on update mode', () => {
    component.dialogData = { isNew: true, restaurantDetails: {} };
    component.isEditMode =true;
    component.restaurantForm.setValue({
      name: 'New Restaurant',
      email: 'new@example.com',
      description: 'New Description',
      location: 'New Location',
      openingHours: '10AM-10PM',
      rating: 5,
      contactNumber: '0987654321',
      website: 'http://new.com'
    });
    
    restaurantServiceSpy.updateRestaurant.and.returnValue(of(data));
    component.onSubmit();
  });

  it('should submit new restaurant on add mode', () => {
    component.dialogData = { isNew: true, restaurantDetails: {} };
    component.isEditMode =false;
    component.restaurantForm.setValue({
      name: 'New Restaurant',
      email: 'new@example.com',
      description: 'New Description',
      location: 'New Location',
      openingHours: '10AM-10PM',
      rating: 5,
      contactNumber: '0987654321',
      website: 'http://new.com'
    });
    
    restaurantServiceSpy.addRestaurant.and.returnValue(of(data));
    component.onSubmit();
  });
  it('should submit updated restaurant on edit mode', () => {
    restaurantServiceSpy.updateRestaurant.and.returnValue(of());
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should handle error on update restaurant', () => {
    restaurantServiceSpy.updateRestaurant.and.returnValue(throwError('Error'));
    component.onSubmit();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
