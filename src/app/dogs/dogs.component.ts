import { Component } from '@angular/core';
import { DogService } from '../dog.service';
import { Dog } from '../types';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent {
  dogs: Dog[] = []
  isLoading = true;
  private subscription: Subscription = new Subscription();

  constructor(private dogService: DogService) {
  }

  ngOnInit(): void {
    this.getDogs()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDogs(): void {
    this.subscription = this.dogService.getDogs().subscribe(
      (dogs) => {
        this.dogs = dogs;
        this.isLoading = false;
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  updateDog(dog: Dog): void {
  }

  async deleteDog(dog: Dog): Promise<void> {
    this.isLoading = true;
    await this.dogService.deleteDog(dog.id).toPromise()
    this.dogs = this.dogs.filter((currentDog) => currentDog.id !== dog?.id)
    this.isLoading = false;
  }
}
