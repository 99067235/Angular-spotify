import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  movableButtonStyles: any = {
    position: 'relative',
    left: '0',
    transition: 'left 0.01s'
  };
  clickCounter = 0;
  gifUrls = ['https://media.tenor.com/O0HXLFkP5VcAAAAi/among-us.gif',
    'https://media.tenor.com/XTsLyyT2KRgAAAAC/thumbs-up-simon-cowell.gif',
  'https://media.tenor.com/2kjvgH8AC5EAAAAd/your-mom-doing-your-mom.gif',
  'https://media.tenor.com/YcXDra0MAnoAAAAM/bobux-0bobux.gif']
  secretEvent() {
    this.clickCounter += 1;
    const randomGif = Math.floor(Math.random() * this.gifUrls.length);
    if (this.clickCounter === 5) {
      Swal.fire({
        title: 'Congratulations!',
        text: 'You won free robux. Click here to claim your prize:',
        imageUrl: this.gifUrls[randomGif],
        showCancelButton: true,
        confirmButtonText: 'Claim prize',
        cancelButtonText: 'Ignore',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0&pp=ygUOcmlja3JvbGwgbm8gYWQ%3D', '_blank')
        }
      })
      this.clickCounter = 0;
    }
  }
}
