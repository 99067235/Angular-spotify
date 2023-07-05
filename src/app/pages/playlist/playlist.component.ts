import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {SpotifyService} from "../../services/spotify.service";
import {NotificationService} from "../../services/notification.service";
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  constructor(private spotifyService: SpotifyService, private notification: NotificationService) {
  }
  protected playlistContent: any
  private playlistId: any;
  ngOnInit() {
    const playlistContent = localStorage.getItem('playlistContent')
    if (playlistContent !== null) {
      this.playlistContent = JSON.parse(playlistContent)
      console.log(this.playlistContent);
      this.playlistId = localStorage.getItem('currentPlaylistId')
    }
    this.playlistContent = this.spotifyService.convertSongDurationToMin(this.playlistContent);
  }

  getSongDetails(trackUri: string) {
    this.spotifyService.getSongDetails(trackUri)
  }

  addTrackToPlaylist(trackUri: string) {
    this.spotifyService.selectPlaylist().then(playlistId => {
      if (playlistId !== 'null') {
        this.spotifyService.addTrackToPlaylist(trackUri, playlistId.toString()).subscribe(() => {
        })
      }
    })
  }

  deleteTrackFromPlaylist(trackUri: string) {
    this.spotifyService.deleteTrackFromPlaylist(trackUri, this.playlistId).then((playlistContent => {
      this.playlistContent = playlistContent
    }))
  }

}
