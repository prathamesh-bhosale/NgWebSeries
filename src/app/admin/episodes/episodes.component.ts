import { EpisodeService } from './../../services/episode.service';
import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/models/episode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  showloading: boolean = false;
  message: string = null;


  episode: Episode = {id: null, name: null,
    imageurl: null, videourl: null, seriesid: null
  }

  episodeList: Episode[] = [];
  imageFile: File = null;
  videoFile: File = null;

  constructor(private episodeService: EpisodeService,
    private activatedRoute: ActivatedRoute) {
      this.episode.seriesid = activatedRoute.snapshot.params["seriesid"]
     }

  ngOnInit(): void {
    this.episodeService.getAllEpisodesBySeriesId(this.episode.seriesid).subscribe(
      (list) => {
        this.episodeList = list
        console.log(list)
      }
    )
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
    _episodeFormData.append("imageurl", this.imageFile, this.imageFile.name)
    _episodeFormData.append("videourl", this.videoFile, this.videoFile.name)

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
    this.episode.name = null;
    this.episode.imageurl = null;
    this.episode.videourl = null;
  }

  getAbosolutePath(relativePath: string): string{
    return this.episodeService.getAbsolutePath(relativePath);
  }

  selectedImage(event){
    this.imageFile = event.target.files[0]
    console.log(this.imageFile)
  }

  selectedVideo(event){
    this.videoFile = event.target.files[0]
    console.log(this.videoFile)
  }
}
