import { Component } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {NotificationService} from "../../services/notification.service";
@Component({
  selector: 'app-songs-overview',
  templateUrl: './songs-overview.component.html',
  styleUrls: ['./songs-overview.component.css']
})
export class SongsOverviewComponent {
  constructor(private spotifyService: SpotifyService, private notification: NotificationService) {
  }
  protected songs: any

  ngOnInit() {
    const songs = localStorage.getItem('songs')
    if (songs !== null) {
      this.songs = JSON.parse(songs)
    }
    console.log(this.songs);
  }

  addTrackToPlaylist(trackUri: string) {
    this.spotifyService.selectPlaylist().then(playlistId => {
      if (playlistId !== 'null') {
        this.spotifyService.addTrackToPlaylist(trackUri, playlistId.toString()).subscribe(response => {
          this.notification.success('Song successfully added')
        })
      }
    })
  }

  deleteTrackFromPlaylist(trackUri: string) {
    this.spotifyService.selectPlaylist().then((playlistId => {
      if (playlistId !== 'null') {
        this.spotifyService.deleteTrackFromPlaylist(trackUri, playlistId.toString())
      }
    }))
  }

  getSongDetails(trackUri: string) {
    this.spotifyService.getSongDetails(trackUri)
  }

  protected readonly Math = Math;
}
