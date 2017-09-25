export class User {
  constructor(public name: string) {
    this.name = name;
  }

  greet() {
    return this.name;
  }
}
