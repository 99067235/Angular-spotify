import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {SpotifyService} from "../../services/spotify.service";
import {NotificationService} from "../../services/notification.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private http: HttpClient, private router: Router, private spotifyService: SpotifyService, private notification: NotificationService) {
  }
  protected userData: any;
  protected displayName: any;
  protected profilePictureUrl: any;
  protected country: any;
  public searchResults: any;
  protected featured: any;
  protected playlists: any;
  protected genres: any[] = [];
  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });
    this.http.get<any>('https://api.spotify.com/v1/me', {headers}).subscribe(userData => {
      this.userData = userData;
      this.displayName = userData['display_name'];
      this.profilePictureUrl = userData['images'][0]['url'];
      this.country = userData['country'];
    });
    this.getFeaturedContent();
    this.getRandomGenres()
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
      this.featured = this.spotifyService.convertSongDurationToMin(this.featured);
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
        localStorage.setItem('songs', JSON.stringify(this.searchResults))
        this.router.navigate(['/songs-overview'])
      });
    }
  }

  getRandomGenres() {
    this.spotifyService.getGenres().subscribe(response => {
      for (let i = 0; i < 5; i++) {
        this.genres.push(response.genres[i])
      }
    })
  }

  selectGenre(genre: any) {
    this.spotifyService.getSongsFromGenre(genre).subscribe(response => {
      localStorage.setItem('songs', JSON.stringify(response.tracks))
      this.router.navigate(['/songs-overview'])
    })
  }

  addTrackToPlaylist(trackUri: string) {
    this.spotifyService.selectPlaylist().then(playlistId => {
      if (playlistId !== 'null') {
        this.spotifyService.addTrackToPlaylist(trackUri, playlistId.toString()).subscribe(response => {
          this.notification.success('Song successfully added')
        })
      }
    })
  }

  deleteTrackFromPlaylist(trackUri: string) {
    this.spotifyService.selectPlaylist().then((playlistId => {
      if (playlistId !== 'null') {
        this.spotifyService.deleteTrackFromPlaylist(trackUri, playlistId.toString())
      }
    }))
  }

  getSongDetails(trackUri: string) {
    this.spotifyService.getSongDetails(trackUri)
  }

}
