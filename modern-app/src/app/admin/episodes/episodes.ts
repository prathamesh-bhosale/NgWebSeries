import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../../services/episode.service';
import { Episode } from '../../models/episode';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './episodes.html',
  styleUrl: './episodes.css'
})
export class EpisodesComponent implements OnInit {

  private episodeService = inject(EpisodeService);
  private activatedRoute = inject(ActivatedRoute);

  showloading: boolean = false;
  message: string | null = null;

  episode: Episode = new Episode(0, '', '', '', 0);
  episodeList: Episode[] = [];
  imageFile: File | null = null;
  videoFile: File | null = null;

  constructor() {
    // initialize seriesid from route
    this.episode.seriesid = this.activatedRoute.snapshot.params["seriesid"];
  }

  ngOnInit(): void {
    if (this.episode.seriesid) {
      this.episodeService.getAllEpisodesBySeriesId(this.episode.seriesid).subscribe(
        (list) => {
          this.episodeList = list
          console.log(list)
        }
      )
    }
  }

  delete(_episode: Episode){
    console.log(_episode)
    this.showloading = true
    this.message = 'Please wait .....'
    let index = this.episodeList.indexOf(_episode)
    this.episodeService.deleteEpisode(_episode.id).subscribe(
      (deleted) => {
        setTimeout(() => {
          this.showloading = false
          this.message = "Episode " + deleted.name + " deleted"
          this.episodeList.splice(index, 1)
        }, 1000);
      }
    )
  }

  submit(){
    this.showloading = true;
    this.message = "Please wait....."

    let _episodeFormData :FormData = new FormData()
    _episodeFormData.append("name", this.episode.name)
    _episodeFormData.append("seriesid", this.episode.seriesid.toString())
    if(this.imageFile) _episodeFormData.append("imageurl", this.imageFile, this.imageFile.name)
    if(this.videoFile) _episodeFormData.append("videourl", this.videoFile, this.videoFile.name)

    this.episodeService.addEpisode(_episodeFormData).subscribe(
      (inserted) => {
        setTimeout(() => {
          this.showloading = false;
          this.message = "Episode " + inserted.name + " added"
          this.episodeList.push(inserted)
          this.reset()
        }, 1000);
      }
    )
  }

  reset(){
    // Keep seriesid
    const sid = this.episode.seriesid;
    this.episode = new Episode(0, '', '', '', sid);
    this.imageFile = null;
    this.videoFile = null;
  }

  getAbsolutePath(relativePath: string): string{
    return this.episodeService.getAbsolutePath(relativePath);
  }

  selectedImage(event: any){
    this.imageFile = event.target.files[0]
    console.log(this.imageFile)
  }

  selectedVideo(event: any){
    this.videoFile = event.target.files[0]
    console.log(this.videoFile)
  }
}
