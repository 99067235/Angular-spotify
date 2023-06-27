import { Component } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {
  constructor(private spotifyService: SpotifyService, private router: Router) {
  }

  protected playlistNames: any;
  ngOnInit() {
    this.spotifyService.getPlaylists().subscribe(response => {
      this.playlistNames = response.items.map((playlist: { name: any; id: any; images: any; }) => ({ name: playlist.name, id: playlist.id, image: playlist.images[0].url }));
    })
  }

  openPlaylist(playlistId: string) {
    this.spotifyService.getPlaylistContent(playlistId).subscribe(response => {
      localStorage.setItem('playlistContent', JSON.stringify(response.items))
      this.router.navigate(['/playlist'])
    })
  }
}
