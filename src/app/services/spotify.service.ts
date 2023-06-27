import { Injectable } from '@angular/core';
import SpotifyWebApi from "spotify-web-api-js";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private spotifyApi: any;

  constructor(private http: HttpClient) {
    this.spotifyApi = new SpotifyWebApi();
  }

  addTrackToPlaylist(trackUri: string, playlistId: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('spotifyAccessToken'));
    const body = {
      uris: [trackUri]
    };
    return this.http.post<any>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, body, { headers })
  }

  getPlaylists() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('spotifyAccessToken')
    });
    return this.http.get<any>('https://api.spotify.com/v1/me/playlists', { headers })
  }

  selectPlaylist(trackUri: string): Promise<string | boolean> {
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


  setAccessToken(token: any) {
    localStorage.setItem('spotifyAccessToken', token)
  }
}
