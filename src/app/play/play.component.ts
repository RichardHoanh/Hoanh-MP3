import {Component} from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  audioPlayer: HTMLAudioElement = new Audio();

  constructor() {
    this.audioPlayer.src = "../assets/music/To-Mac-Gia-Truong-Hieu-Duong.mp3";
    this.audioPlayer.load();
  }

  playAudio() {
    this.audioPlayer.play();
  }

  pauseAudio() {
    this.audioPlayer.pause();
  }

}





