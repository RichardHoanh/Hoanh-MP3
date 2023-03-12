import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {


  ngOnInit(): void {
  }
  //Tạo đối tượng audioPlayer có kiểu dữ liệu HTMLAudioElement là 1 đối tượng của class Audio
  // audioPlayer: HTMLAudioElement = new Audio();
  songs = [
    {title: "Hoành", url: "../assets/music/Ghi tiêu chuẩn 2.mp3"},

    {title: "Sứ thanh hoa", url: "../assets/music/Sứ Thanh Hoa - Guitar.mp3"},
    {title: "Người em cố đô", url: "../assets/music/Nguoi-Em-Co-Do-Orinn-Remix-Rum.mp3"},
    {title: "Anh thề đấy", url: "../assets/music/ANH THỀ ĐẤY - THANH HƯNG - OFFICIAL MUSIC VIDEO.mp3"},
    {title: "Xe đạp", url: "../assets/music/[MV] Xe Đạp - Thùy Chi ft. M4U - The Pink Team.mp3"},
    {
      title: "Lý do là gì",
      url: "../assets/music/Lý Do Là Gì (AIR Remix) - Nguyễn Vĩ ♫ Ngày Hôm Ấy Em Buông Tay Anh Vì Lý Do Gì Remix TikTok.mp3"
    },
    {title: "Tự chính khang viên", url: "../assets/music/Tu-Chinh-Khang-Vien-Luan-Tang-Truong-Hieu-Ham.mp3"},
    {title: "Tô Mạc Già", url: "../assets/music/To-Mac-Gia-Truong-Hieu-Duong.mp3"},
  ];
  //Khai báo 1 mảng chứa các phần tử dùng để phát nhạc
  playList: HTMLAudioElement[] = []
  audioGlobal = new Audio()
  private playBtn: any;
  private loopBtn: any;
  private randomBtn: any;
  private muteBtn: any;
  // Hiệu ứng quay ảnh
  private musicThumbnail : any;


  constructor() {
    let self = this
    // Lặp từng phần tử trong mảng songs
    // Tại mỗi lần lặp ta thực hiện hành động gán giá trị thuộc tính url cho đối tượng audioLocal của class Audio
    // Sau đó ta đẩy phần tử audioLocal vào trong mảng playList
    this.songs.forEach(function (song) {
      let audioLocal = new Audio()
      // Truyền đường dẫn cho các phần tử audioGlobal
      audioLocal.src = song.url
      audioLocal.load()
      self.playList.push(audioLocal)

    })
    console.log(this.playList)
    console.log(this.playList[0])

  }

  currentSongIndex: number = 0;

  audio: HTMLAudioElement = new Audio(this.songs[this.currentSongIndex].url);


  playAndPauseAudio() {
    this.playBtn = document.querySelector(".player-inner");
    this.musicThumbnail = document.querySelector(".music-thumb");
    if (this.audio.paused) {
      this.audio.play();

      // this._timer = setInterval(this.displayTimer, 500);


      this.musicThumbnail.classList.add("is-playing");

      this.playBtn.innerHTML = '<i class="fa fa-pause play-icon" aria-hidden="true"></i>'

      this.audio.addEventListener('ended', () => {
        this.nextSong();
      });
      this.audio.addEventListener('loadedmetadata', () => {
        console.log('Thoi luong bai hat la: ' + this.audio.duration + ' s');
        this.duration = this.audio.duration;

      });
      setInterval(() => {
        this.currentTime = this.audio.currentTime;
        console.log(this.currentTime)
      }, 1000);


    } else {
      this.audio.pause();

      // clearInterval(this._timer);

      this.musicThumbnail.classList.remove("is-playing");
      this.playBtn.innerHTML = '<i class="fa fa-play play-icon" aria-hidden="true"></i>'

    }
  }

  nextSong() {
    this.currentSongIndex++;
    if (this.currentSongIndex >= this.songs.length) {
      this.currentSongIndex = 0;
    }
    this.audio.src = this.playList[this.currentSongIndex].src;
    if (this.audio.paused) {
      this.audio.play();
    }
    console.log(this.currentSongIndex)

  }

  previousSong() {
    this.currentSongIndex--;
    if (this.currentSongIndex < 0) {
      this.currentSongIndex = this.songs.length - 1;
    }
    this.audio.src = this.playList[this.currentSongIndex].src;
    if (this.audio.paused) {
      this.audio.play();
    }
    console.log(this.currentSongIndex)
  }

  isLoop: boolean = false;

  loopSong() {
    this.loopBtn = document.querySelector(".play-infinite");

    if (this.isRandom) {
      this.isRandom = false;
      this.loopBtn.removeAttribute("style");
      this.audio.loop = false

    } else {
      this.isRandom = true;
      this.loopBtn.style.color = "#0056fe";
      this.audio.loop = true
    }
    console.log(this.currentSongIndex)

  }

  isRandom: boolean = false;

  randomSong() {

    this.loopBtn = document.querySelector(".play-random");

    if (this.isRandom) {
      this.isRandom = false;
      this.randomBtn.removeAttribute("style");
      this.audio.loop = false

    } else {
      this.isRandom = true;
      this.randomBtn.style.color = "#0056fe";
      this.audio.loop = true
    }
  }

  onAndOffVolume() {
    this.muteBtn = document.querySelector(".volume-mute");
    if (this.audio.muted) {
      this.muteBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>'

      this.audio.muted = false
    } else {
      this.muteBtn.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>'

      this.audio.muted = true
    }
  }

  volume: number = 1;

  controlVolume(event: Event) {
    let input = event.target as HTMLInputElement
    this.audio.volume = Number(input.value)
    this.fillVolume()
  }

  fillVolume() {
    let input = document.querySelector('.volume-range') as HTMLInputElement
    let percentage = +input.value / +input.max * 100;
    input.style.setProperty('--volPercentage', percentage + '%')
  }

  onRangeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.audio.currentTime = target.valueAsNumber;
  }

  currentTime: number = 0;
  duration: number = 0;
















}









