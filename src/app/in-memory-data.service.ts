import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Dog } from './types';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const dogs: Dog[] = [
      { id: 1, name: 'Dr. Nice', img: '/assets/dog-1.jpg' },
      { id: 2, name: 'Bombasto', img: '/assets/dog-2.jpg'  },
      { id: 3, name: 'Celeritas', img: '/assets/dog-3.jpg'  },
      { id: 4, name: 'Magneta', img: '/assets/dog-4.jpg'  },
      { id: 5, name: 'RubberMan', img: '/assets/dog-1.jpg'  },
      { id: 6, name: 'Dynama', img: '/assets/dog-2.jpg'  },
      { id: 7, name: 'Dr. IQ', img: '/assets/dog-3.jpg'  },
      { id: 8, name: 'Magma', img: '/assets/dog-4.jpg'  },
      { id: 9, name: 'Tornado', img: '/assets/dog-1.jpg'  }
    ];
    return { dogs };
  }

  // Overrides the genId method to ensure that a dog always has an id.
  // If the dog array is empty, the method below returns 1.
  // if the dog array is not empty, the method below returns the highest
  // dog id + 1.
  genId(dogs: Dog[]): number {
    return dogs.length > 0 ? Math.max(...dogs.map(dog => dog.id)) + 1 : 1;
  }
}