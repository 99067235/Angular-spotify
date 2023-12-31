import { Component } from '@angular/core';
import {SpotifyService} from "../services/spotify.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private spotifyService: SpotifyService) {
  }
  movableButtonStyles: any = {
    position: 'relative',
    left: '0',
    transition: 'left'
  };
  clickCounter = 0;

  secretEvent() {
    this.clickCounter += 1;
    if (this.clickCounter === 5) {
      const logoImage = document.getElementById('logo');
      if (logoImage !== null) {
        logoImage.id = 'logoImageDrop';
      }
      this.clickCounter = 0;
    }
  }

  likePage() {
    const logoImage = document.getElementById('logoImageDrop');
    if (logoImage !== null) {
      logoImage.id = 'logoImageReturn';
    }
  }

}
