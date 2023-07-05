import { Component } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {NotificationService} from "../../services/notification.service";
@Component({
  selector: 'app-genre-songs-overview',
  templateUrl: './genre-songs-overview.component.html',
  styleUrls: ['./genre-songs-overview.component.css']
})
export class GenreSongsOverviewComponent {
  constructor(private spotifyService: SpotifyService, private notification: NotificationService) {
  }
  protected genre_songs: any[] = [];
  ngOnInit() {
    const genre_songs = localStorage.getItem('genre-songs');
    if (genre_songs !== null) {
      this.genre_songs = JSON.parse(genre_songs)
    }
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

}
