import { Injectable } from '@angular/core';
import SpotifyWebApi from "spotify-web-api-js";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {NotificationService} from "./notification.service";
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private spotifyApi: any;

  constructor(private http: HttpClient, private notification: NotificationService) {
    this.spotifyApi = new SpotifyWebApi();
  }

  convertSongDurationToMin(playlist: any) {
    for (const song in playlist) {
      playlist[song].duration_min = Math.round((playlist[song].duration_ms / 60000))
      delete playlist[song].duration_ms
    }
    return playlist;
  }

  getSongsFromGenre(genre: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('spotifyAccessToken'));
    const params = { seed_genres: genre, limit: '10' };
    return this.http.get<any>('https://api.spotify.com/v1/recommendations', { headers, params })
  }

  getGenres() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('spotifyAccessToken'));
    return this.http.get<any>('https://api.spotify.com/v1/recommendations/available-genre-seeds', { headers })
  }

  addTrackToPlaylist(trackUri: string, playlistId: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('spotifyAccessToken'));
    const body = {
      uris: [trackUri]
    };
    return this.http.post<any>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, body, { headers })
  }

  deleteTrackFromPlaylist(trackUri: string, playlistId: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });
    const body = {tracks: [{uri: trackUri}]};
    const options = {headers, body};
    return new Promise((resolve) => {
      this.http.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, options)
        .subscribe(
          () => {
            this.notification.success('Song successfully deleted')
            this.getPlaylistContent(playlistId).subscribe(response => {
              resolve(response.items);
            })
          },
          () => {
            this.notification.error('Something went wrong')
          }
        );
    })
  }

  getPlaylists() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });
    return this.http.get<any>('https://api.spotify.com/v1/me/playlists', { headers })
  }

  selectPlaylist(): Promise<string | boolean> {
    return new Promise((resolve, reject) => {
      this.getPlaylists().subscribe(response => {
        Swal.fire({
          html: '<select id="playlistsDropdown"></select>'
        }).then((result) => {
          if (result.isConfirmed) {
            const playlistId = (document.getElementById('playlistsDropdown') as HTMLSelectElement).value;
            resolve(playlistId);
          } else {
            resolve('null');
          }
        });

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
      });
    });
  }

  getPlaylistContent(playlistId: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });
    return this.http.get<any>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers })
  }

  getSongDetails(trackUri: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });
    trackUri = trackUri.split(':')[2]
    this.http.get<any>(`https://api.spotify.com/v1/tracks/${trackUri}`, { headers }).subscribe(data => {
      Swal.fire({
        title: 'Song details',
        html: '<ul><li>Artist: ' + data.artists[0].name + '</li><li>Album: ' + data.album.name + '</li><li>Track URL: ' + data.external_urls.spotify + '</li><li>Duration: ' + data.duration_ms + '</li></ul>'
      })
    })
  }


  setAccessToken(token: any) {
    localStorage.setItem('spotifyAccessToken', token)
  }
}
