import { Injectable } from '@angular/core';
import SpotifyWebApi from "spotify-web-api-js";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
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

  setAccessToken(token: any) {
    localStorage.setItem('spotifyAccessToken', token)
  }
}
