import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user1Activated = false;
  user2Activated = false;

  constructor(private _userService: UserService) {

  }
  ngOnInit() {

    this._userService.userActivated.subscribe(
      (userId: number) => {
        if (userId === 1) {
          this.user1Activated = true;
        }else if (userId === 2) {
          this.user2Activated = true;
          console.log(this.user2Activated);
        }
      }
    );
  }
}
