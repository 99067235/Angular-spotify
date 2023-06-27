import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  success(message: string) {
    Swal.fire({
      icon: 'success',
      text: message,
      showConfirmButton: false,
      position: 'bottom-right',
      toast: true,
      timer: 1500
    })
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      text: message,
      showConfirmButton: false,
      position: 'bottom-right',
      toast: true,
      timer: 1500
    })
  }
}
