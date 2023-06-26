import { Component } from '@angular/core';
import {ProfileComponent} from "../profile/profile.component";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor() {
  }
  protected searchResults: any;
  ngOnInit() {
    const searchResultsString = localStorage.getItem('searchResults');
    if (searchResultsString !== null) {
      this.searchResults = JSON.parse(searchResultsString);
    }
  }

}
