import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  protected featured: any;
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
    this.getFeaturedContent();
  }

  getFeaturedContent() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });

    this.http.get<any>('https://api.spotify.com/v1/browse/featured-playlists', { headers }).subscribe(response => {
      const playlists = response.playlists.items;
      if (playlists.length > 0) {
        const playlistId = playlists[0].id; // Use the first featured playlist
        this.fetchSongsFromPlaylist(playlistId, headers)
      }
    });
  }

  fetchSongsFromPlaylist(playlistId: string, headers: HttpHeaders) {
    this.http.get<any>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers }).subscribe(response => {
      this.featured = response.items.map((item: { track: any; }) => item.track);
    });
  }

  search() {
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
