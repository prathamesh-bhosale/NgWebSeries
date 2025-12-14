export class Episode {
  constructor(
    public id: number,
    public name: string,
    public imageurl: string,
    public videourl: string,
    public seriesid: number,

    public date?: string,
    public duration?: string,
    public views?: number,
    public likes?: number,
    public dislikes?: number
  ){}
}
