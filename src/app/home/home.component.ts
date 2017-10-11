import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  myNumbersSubscription: Subscription;
  myObservableSubscription: Subscription;
  constructor() { }

  ngOnInit() {


    // Example of interval
    const myNumbers = Observable.interval(1000)
    .map(
      (data: number) => {
        return data * 2;
      }
    );
    this.myNumbersSubscription = myNumbers.subscribe(
      (_number: number) => {
        console.log(_number);
      }
    );


    // First custom observable
    const myObservable = Observable.create(
      (_observer: Observer<string>) => {
        /* Timer will send string to subscribe after defined time in async way */
        setTimeout(() => {
          // The First value that observer will transfer to subscribe after 2 sec
          _observer.next('First value');
        }
        , 2000);
        setTimeout(() => {
          // The Second value that observer will transfer to subscribe after 3 sec
          _observer.next('Second value');
        }
        , 3000);
        setTimeout(() => {
          // The complete method will finish this Observable
          _observer.complete();
        }
        , 7000);
        setTimeout(() => {
          // The error method will never be executed because complete method came earlier
          _observer.error('Oooops we have an error');
        }
        , 10000);
      }
    );


    // Subscribe to my custom observable
    this.myObservableSubscription = myObservable.subscribe(
      (_data: string) => {
        // My sent data is of type string
        console.log(_data);
      },
      (_error: string) => {
        // This method will never be executed because complete came earlier
        console.log(_error);
      },
      (_complete: string) => {
        // Once observer will use method complete I will get data of it here
        console.log('Observable complete');
      }
    );
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the observable subscription.
    this.myObservableSubscription.unsubscribe();
    this.myNumbersSubscription.unsubscribe();
  }

}
