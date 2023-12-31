import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {CallbackComponent} from "./pages/callback/callback.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {SearchComponent} from "./pages/search/search.component";
import {PlaylistsComponent} from "./pages/playlists/playlists.component";
import {PlaylistComponent} from "./pages/playlist/playlist.component";
import {SongsOverviewComponent} from "./pages/songs-overview/songs-overview.component";
const routes: Routes = [
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "callback", component: CallbackComponent},
  {path: "search", component: SearchComponent, canActivate: [AuthGuard]},
  {path: "playlists", component: PlaylistsComponent, canActivate: [AuthGuard]},
  {path: "playlist", component: PlaylistComponent, canActivate: [AuthGuard]},
  {path: "songs-overview", component: SongsOverviewComponent, canActivate: [AuthGuard]},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
