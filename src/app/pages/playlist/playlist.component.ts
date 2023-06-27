import { Component } from '@angular/core';
import {PlaylistsComponent} from "../playlists/playlists.component";
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  constructor(private playlistsComponent: PlaylistsComponent) {
  }
  protected playlistContent: any

  ngOnInit() {
    const playlistContent = localStorage.getItem('playlistContent')
    if (playlistContent !== null) {
      this.playlistContent = JSON.parse(playlistContent)
      console.log(this.playlistContent);
    }
  }
}
