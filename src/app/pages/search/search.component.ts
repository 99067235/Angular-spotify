import { Component } from '@angular/core';
import {ProfileComponent} from "../profile/profile.component";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(public profileComponent: ProfileComponent) {
  }
  protected searchResults: any;
  ngOnInit() {
    const searchResultsString = localStorage.getItem('searchResults');
    if (searchResultsString !== null) {
      this.searchResults = JSON.parse(searchResultsString);
    }
  }

  addTrackToPlaylist(songUri: string) {
    this.profileComponent.addTrackToPlaylist(songUri)
  }

  deleteTrackFromPlaylist(songUri: string) {
    this.profileComponent.deleteTrackFromPlaylist(songUri)
  }
}
