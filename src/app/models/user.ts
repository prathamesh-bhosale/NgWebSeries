export class User {
  constructor(
      public id: number,
      public name: string,
      public password: string,
      public emailid?: string,
      public role?: string
  ){}
}
