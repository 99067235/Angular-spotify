import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private http: HttpClient, private router: Router) {
  }
  protected userData: any;
  protected displayName: any;
  protected profilePictureUrl: any;
  protected country: any;
  public searchResults: any;
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

  searchForContent() {
    const search = (document.getElementById('searchBox') as HTMLInputElement).value;
    if (search !== '') {
      this.http.get<any>('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
        },
        params: {
          q: search,
          type: 'track',
          limit: '10'
        }
      }).subscribe(response => {
        this.searchResults = response.tracks.items;
        localStorage.setItem('searchResults', JSON.stringify(this.searchResults))
        this.router.navigate(['/search'])
      });
    }
  }

}
