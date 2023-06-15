import { Component } from '@angular/core';
import { DogService } from '../dog.service';
import { Dog } from '../types';
import { Subscription } from "rxjs";

type UpdatedDog = {
  idx: number;
  newName: string
}

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css'],
})
export class DogsComponent {
  dogs: Dog[] = []
  uptadingDog: UpdatedDog = { idx: -1, newName: "" }
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

  async updateDog(dog: Dog): Promise<void> {
    this.isLoading = true;
    if (this.uptadingDog.newName === "") {
      alert("Name cannot be empty !")
      return;
    }
    const newDog: Dog = { ...dog, name: this.uptadingDog.newName ?? "" }
    await this.dogService.updateDog(newDog).toPromise()
    this.dogs[this.uptadingDog.idx] = newDog;
    this.uptadingDog = { idx: -1, newName: "" }
    this.isLoading = false;
  }

  async deleteDog(dog: Dog): Promise<void> {
    const isOK = confirm("Are you sure to want to delete this dog ?")
    if (!isOK) return;
    this.isLoading = true;
    await this.dogService.deleteDog(dog.id).toPromise()
    const idxOfDeletedDog = this.dogs.findIndex((currentDog) => currentDog.id === dog.id)
    this.dogs = this.dogs.filter((currentDog) => currentDog.id !== dog?.id)
    if (idxOfDeletedDog === this.uptadingDog.idx) this.uptadingDog = { idx: -1, newName: "" }
    this.isLoading = false;
  }
}
