import { Injectable } from '@angular/core';
import SpotifyWebApi from "spotify-web-api-js";
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private spotifyApi: any;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
  }

  setAccessToken(token: any) {
    localStorage.setItem('spotifyAccessToken', token)
  }
}
