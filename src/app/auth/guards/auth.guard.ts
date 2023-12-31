import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor() {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken = localStorage.getItem('spotifyAccessToken');
    if (accessToken != null) {
      localStorage.setItem('redirectUrl', state.url);
      return true;
    } else {
      localStorage.setItem('redirectUrl', state.url);
      const clientId = 'bcd978ceea62427e8fd405bf316d9272';
      const redirectUri = 'http://localhost:4200/callback/';
      const scopes = ['user-read-private', 'user-read-email', 'user-follow-read', 'user-library-read', 'user-top-read', 'playlist-modify-public', 'playlist-modify-private'];
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&response_type=token`;
      return true;
    }
  }

}
