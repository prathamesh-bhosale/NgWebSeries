export class Movie {
  constructor(
    public id: number,
    public name: string,
    public categories: string,
    public language: string,
    public releaseddate: string,
    public story: string,
    public forkid: string,
    public imageurl: string,
    public videourl: string,
    public views: number,
    public duration?: string,
  ){}
}
