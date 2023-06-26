import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private http: HttpClient) {
  }
  protected userData: any;
  protected displayName: any;
  protected profilePictureUrl: any;
  protected country: any;

  ngOnInit() {
    this.http.get<any>('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
      }
    }).subscribe(userData => {
      this.userData = userData;
      this.displayName = userData['display_name'];
      this.profilePictureUrl = userData['images'][0]['url'];
      this.country = userData['country'];
    });
  }

}
