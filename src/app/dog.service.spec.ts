import { TestBed } from '@angular/core/testing';

import { DogService } from './dog.service';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { map, switchMap } from 'rxjs';
import { Dog } from './types';

describe('DogService', () => {
  let service: DogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { 
            dataEncapsulation: false,
            delay: 0,
          }
        )
      ],
      providers: [DogService],
    });
    service = TestBed.inject(DogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all dogs', (done) => {
    service
      .getDogs()
      .subscribe(dogs => {
        expect(dogs.length).toEqual(9);
        done();
      }, done);
  })

  it('should return a specific dog', (done) => {
    const dogId = 1

    service
      .getDog(dogId)
      .subscribe(dog => {
        expect(dog.id).toEqual(dogId);
        done();
      }, done);
  })

  it('should update a dog', (done) => {
    const dogId = 1
    const dogNewName = 'toto'

    service
      .getDog(dogId)
      .pipe(
        map(dog => {
          dog.name = dogNewName
          return dog 
        }),
        switchMap(dog => service.updateDog(dog)),
        switchMap(() => service.getDog(dogId)),
      )
      .subscribe(dog => {
        expect(dog.name).toEqual(dogNewName);
        done();
      }, done);
  })

  it('should add a dog', (done) => {
    const dog = { 
      name: 'Mr. Toto', 
      img: './assets/dog-1.jpg' 
    }

    service
      .addDog(dog as Dog)
      .subscribe(d => {
        expect(d.name).toEqual(dog.name);
        done();
      }, done)
  })

  it('should delete a dog', (done) => {
    const dogId = 1
    service
      .deleteDog(dogId)
      .pipe(switchMap(() => service.getDog(dogId)))
      .subscribe(
        _ => {}, 
        (err) => {
          expect(err.status).toEqual(404);
          done();
        }
      )
  })
});
