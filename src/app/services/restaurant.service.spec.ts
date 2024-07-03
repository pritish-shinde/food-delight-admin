import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from '../model/restaurant-model';
import { HttpErrorResponse } from '@angular/common/http';

fdescribe('RestaurantService', () => {
  let service: RestaurantService;
  let httpMock: HttpTestingController;
  const dummyRestaurants: Restaurant[] = [
    { id: 1, name: 'Restaurant 1', description: 'Description 1', location: 'Location 1' },
    { id: 2, name: 'Restaurant 2', description: 'Description 2', location: 'Location 2' }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantService]
    });

    service = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve restaurants from the API via GET', () => {
    const dummyRestaurants: Restaurant[] = [
      { id: 1, name: 'Restaurant 1', description: 'Description 1', location: 'Location 1' },
      { id: 2, name: 'Restaurant 2', description: 'Description 2', location: 'Location 2' }
    ];

    service.getRestaurants().subscribe(restaurants => {
      expect(restaurants.length).toBe(2);
      expect(restaurants).toEqual(dummyRestaurants);
    });

    const request = httpMock.expectOne(service.url);
    expect(request.request.method).toBe('GET');
    request.flush(dummyRestaurants);
  });

  it('should delete restaurants', () => {
    service.deleteRestaurant(1);
    
  });
  it('should  update', () => {
    service.updateRestaurant(1, dummyRestaurants[0]);
  });

  it('should add restaurants', () => {
    service.addRestaurant(dummyRestaurants[0]);
  });

  it('should get one Restaurant', () => {
    service.getRestaurantById("1");
  });
  it('should handle 404 error gracefully', () => {
    const errorMessage = `Error Code: 404\nMessage: Http failure response for ${service.url}: 404 Not Found`;

    service.getRestaurants().subscribe(
      () => fail('Expected an error, not restaurants'),
      (error: string) => {
        expect(error).toBe(errorMessage);
      }
    );

    const request = httpMock.expectOne(service.url);
    request.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should handle network error gracefully', () => {
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Simulated network error',
    });

    service.getRestaurants().subscribe(
      () => fail('Expected an error, not restaurants'),
      (error: string) => {
        expect(error).toBe('Error: Simulated network error');
      }
    );

    const request = httpMock.expectOne(service.url);
    request.error(errorEvent);
  });
});
