import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './pages/home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {CallbackComponent} from "./pages/callback/callback.component";
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SongsOverviewComponent } from './pages/songs-overview/songs-overview.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    CallbackComponent,
    ProfileComponent,
    SearchComponent,
    PlaylistsComponent,
    PlaylistComponent,
    SongsOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, HttpClient, ProfileComponent, PlaylistsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
