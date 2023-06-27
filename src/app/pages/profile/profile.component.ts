import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {SpotifyService} from "../../services/spotify.service";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private http: HttpClient, private router: Router, private spotifyService: SpotifyService) {
  }
  protected userData: any;
  protected displayName: any;
  protected profilePictureUrl: any;
  protected country: any;
  public searchResults: any;
  protected featured: any;
  protected playlists: any;
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

    this.http.get<any>('https://api.spotify.com/v1/me/playlists', {headers}).subscribe(response => {
      this.playlists = response.items
      console.log(this.playlists);
    })
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

  createPlaylistsDropdown(trackUri: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });
    this.http.get<any>('https://api.spotify.com/v1/me/playlists', { headers }).subscribe(response => {
      Swal.fire({
        html: '<select id="playlistsDropdown"></select>'
      }).then((result) => {
        if (result.isConfirmed) {
          const playlistId = (document.getElementById('playlistsDropdown') as HTMLSelectElement).value;
          this.spotifyService.addTrackToPlaylist(trackUri, playlistId).subscribe(response => {
            Swal.fire({
              text: 'Success'
            })
          })
        }
      })
      let playlists = response.items;
      playlists = playlists.map((playlist: { name: any; id: any; }) => ({ name: playlist.name, id: playlist.id }));
      let playlistsDropdown = (document.getElementById('playlistsDropdown') as HTMLSelectElement);
      if (playlistsDropdown !== null) {
        playlistsDropdown.innerHTML = '';
      }
      for (var i = 0; i < playlists.length; i++) {
        var option = document.createElement("option");
        option.text = playlists[i].name;
        option.value = playlists[i].id;
        playlistsDropdown.add(option);
      }
    })
  }

  deleteTrackFromPlaylist(trackUri: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });
    const body = {
      tracks: [
        {
          uri: trackUri
        }
      ]
    };

    const options = {
      headers,
      body
    };

    const playlistId = '5yo3kc6R8c52l8vxNtD1pR'

    this.http.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, options)
      .subscribe(
        response => {
          console.log('Track deleted from playlist successfully!', response);
        },
        error => {
          console.error('Error deleting track from playlist:', error);
        }
      );
  }

}
