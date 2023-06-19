import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private baseUrl = 'https://api.spotify.com/v1';
  private clientId = environment.spotify.clientId;
  private clientSecret = environment.spotify.clientSecret;
  private accessToken: string | undefined;

  constructor(private http: HttpClient) {
    this.getAccessToken().subscribe((token) => {
      this.accessToken = token.access_token;
    });
  }

  private getAccessToken() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    );
    return this.http.post<any>('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers
    });
  }

  searchTracks(query: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    const url = `${this.baseUrl}/search?q=${query}&type=track`;
    return this.http.get<any>(url, { headers });
  }
}

