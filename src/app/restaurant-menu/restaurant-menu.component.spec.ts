import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantMenuComponent } from './restaurant-menu.component';

fdescribe('RestaurantMenuComponent', () => {
  let component: RestaurantMenuComponent;
  let fixture: ComponentFixture<RestaurantMenuComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<RestaurantMenuComponent>>;
  let dialogData: any;

  beforeEach(async () => {
    dialogData = {
      menu: [
        {
          Veg: [
            { food: 'Paneer Butter Masala', Price: '$6' },
            { food: 'Chole Bhature', Price: '$4' }
          ]
        },
        {
          NonVeg: [
            { food: 'Lamb Rogan Josh', Price: '$8' },
            { food: 'Prawn Curry', Price: '$7' }
          ]
        }
      ],
      name: 'Test Restaurant'
    };

    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [RestaurantMenuComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dialog data', () => {
    expect(component.menu).toEqual(dialogData.menu);
    expect(component.restaurantName).toBe(dialogData.name);
  });

  it('should call dialogRef.close() when close is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});
