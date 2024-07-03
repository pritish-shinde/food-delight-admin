import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantListComponent } from './restaurant-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



fdescribe('RestaurantListComponent', () => {
  let component: RestaurantListComponent;
  let fixture: ComponentFixture<RestaurantListComponent>;
  let mockRestaurantService: { getRestaurants: { and: { returnValue: (arg0: Observable<{ id: number; name: string; description: string; location: string; contactNumber: number; email: string; openingHours: string; rating: number; menu: never[]; }[]>) => void; }; }; deleteRestaurant: { and: { returnValue: (arg0: Observable<null>) => void; }; }; };
  let mockDialog: any;
  let mockRouter;
  const mockData: any = {
    restrurantList: [
      {
        id: 1,
        name: 'Test Restaurant',
        description: 'Test Description',
        location: 'Test Location',
        contactNumber: 1234567890,
        email: 'test@restaurant.com',
        openingHours: '9AM-10PM',
        rating: 4.5,
        menu: []
      }
    ]
  };

  beforeEach(async () => {
    mockRestaurantService = jasmine.createSpyObj('RestaurantService', ['getRestaurants', 'deleteRestaurant']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, NoopAnimationsModule],
      declarations: [RestaurantListComponent],
      providers: [
        { provide: RestaurantService, useValue: mockRestaurantService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch restaurants on init', () => {
    const mockData: any = {
      restrurantList: [{ id: 1, name: 'Test Restaurant 1', description: 'Description 1', location: 'Location 1', contactNumber: 1234567890, email: 'test1@restaurant.com', openingHours: '9AM-10PM', rating: 4.5, menu: [] },
      { id: 2, name: 'Another Restaurant', description: 'Description 2', location: 'Location 2', contactNumber: 1234567891, email: 'test2@restaurant.com', openingHours: '9AM-10PM', rating: 4.0, menu: [] },
      { id: 3, name: 'Test Restaurant 2', description: 'Description 3', location: 'Location 3', contactNumber: 1234567892, email: 'test3@restaurant.com', openingHours: '9AM-10PM', rating: 4.2, menu: [] }
      ]
    };

    mockRestaurantService.getRestaurants.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.restruantList).toEqual(mockData);
    expect(mockRestaurantService.getRestaurants).toHaveBeenCalled();
  });

  it('should fetch restaurants on init no data', () => {
    const mockData: any = { restrurantList: [] };

    mockRestaurantService.getRestaurants.and.returnValue(of(mockData)) ;

    component.ngOnInit();
    expect(mockRestaurantService.getRestaurants).toHaveBeenCalled();
  });

  it('should open confirmation dialog and delete restaurant on confirm', () => {
    const mockRestaurant = { id: 1, name: 'Test Restaurant' };
    mockDialog.open.and.returnValue({
      afterClosed: () => of(true)
    });

    mockRestaurantService.getRestaurants.and.returnValue(of(mockData));
    mockRestaurantService.deleteRestaurant.and.returnValue(of(null));

    component.deleteRestaurant(mockRestaurant);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockRestaurantService.deleteRestaurant).toHaveBeenCalledWith(mockRestaurant.id);
  });

  it('should open menu dialog', () => {
    const mockRestaurant = { id: 1, name: 'Test Restaurant', menu: [] };

    mockDialog.open.and.returnValue({
      afterClosed: () => of(true)
    });

    component.viewMenu(mockRestaurant);

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should open add/edit restaurant dialog and refresh list on close', () => {
    mockDialog.open.and.returnValue({
      afterClosed: () => of(true)
    });

    mockRestaurantService.getRestaurants.and.returnValue(of(mockData));

    component.addEditRestaurant(true, {});

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockRestaurantService.getRestaurants).toHaveBeenCalled();
  });

  it('should filter restaurants based on search input', () => {
    const mockData = [
      { id: 1, name: 'Test Restaurant 1', description: 'Description 1', location: 'Location 1', contactNumber: 1234567890, email: 'test1@restaurant.com', openingHours: '9AM-10PM', rating: 4.5, menu: [] },
      { id: 2, name: 'Another Restaurant', description: 'Description 2', location: 'Location 2', contactNumber: 1234567891, email: 'test2@restaurant.com', openingHours: '9AM-10PM', rating: 4.0, menu: [] },
      { id: 3, name: 'Test Restaurant 2', description: 'Description 3', location: 'Location 3', contactNumber: 1234567892, email: 'test3@restaurant.com', openingHours: '9AM-10PM', rating: 4.2, menu: [] }
    ];

    component.restruantList.restrurantList = mockData;
    component.allRestaurants = mockData;

    component.searchRestrauntName = 'Test';
    component.onSearch();

    expect(component.restruantList.restrurantList.length).toBe(2);
  });

  it('should filter restaurants based on search no input', () => {
    const mockData = [
      { id: 1, name: 'Test Restaurant 1', description: 'Description 1', location: 'Location 1', contactNumber: 1234567890, email: 'test1@restaurant.com', openingHours: '9AM-10PM', rating: 4.5, menu: [] },
      { id: 2, name: 'Another Restaurant', description: 'Description 2', location: 'Location 2', contactNumber: 1234567891, email: 'test2@restaurant.com', openingHours: '9AM-10PM', rating: 4.0, menu: [] },
      { id: 3, name: 'Test Restaurant 2', description: 'Description 3', location: 'Location 3', contactNumber: 1234567892, email: 'test3@restaurant.com', openingHours: '9AM-10PM', rating: 4.2, menu: [] }
    ];

    component.restruantList.restrurantList = mockData;
    component.allRestaurants = mockData;

    component.searchRestrauntName = '';
    component.onSearch();

    expect(component.restruantList.restrurantList.length).toBe(3);

  });
});
