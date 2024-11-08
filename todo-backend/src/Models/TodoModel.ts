export class Todo {
  constructor(
    public title: string,
    public done: boolean,
    public description?: string,
    public userId?: any
  ) {
    (this.title = title),
      (this.done = done),
      (this.description = description),
      (this.userId = userId);
  }
}
