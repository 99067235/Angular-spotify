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
      const playlists = response.items;
      for (const playlist in playlists) {
        if (playlists[playlist].images.length === 0) {
          playlists[playlist].images = [
            {
              "height": 640,
              "url": 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019',
              "width": 640
            }
          ]
        }
      }
      this.playlistNames = playlists.map((playlist: { name: any; id: any; images: any; }) => ({ name: playlist.name, id: playlist.id, image: playlist.images[0].url }));
    })
  }

  openPlaylist(playlistId: string) {
    this.spotifyService.getPlaylistContent(playlistId).subscribe(response => {
      localStorage.setItem('playlistContent', JSON.stringify(response.items))
      localStorage.setItem('currentPlaylistId', playlistId)
      this.router.navigate(['/playlist'])
    })
  }
}
