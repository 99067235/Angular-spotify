import { Component } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  constructor(private http: HttpClient, private spotifyService: SpotifyService, private router: Router) {
  }

  ngOnInit() {
    const accessToken = new URLSearchParams(window.location.hash.substr(1)).get('access_token');
    this.spotifyService.setAccessToken(accessToken);
    this.router.navigate([localStorage.getItem('redirectUrl')])
  }

}
