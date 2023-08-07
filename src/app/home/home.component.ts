import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  playVideo(): void {
    const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
    videoElement.play();
  }
}
