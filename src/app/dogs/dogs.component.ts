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
  private subscription: Subscription = new Subscription();

  constructor(private dogService: DogService) {
  }

  ngOnInit(): void {
    this.subscription = this.dogService.getDogs().subscribe(
      (data) => {
        this.dogs = data
      },
      (error: any) => {
        console.error(error);
      },
      () => {
        console.log('Observable completed');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDogs(): void {
  }

  updateDog(dog: Dog): void {
  }

  deleteDog(dog: Dog): void {
  }
}
