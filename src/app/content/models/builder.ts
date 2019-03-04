export abstract class IBuilder {
  static empty<T>(): T {
    return;
  }
  static fromBackEnd<T1, T2>(algo: T1): T2 {
    return;
  }
  static toBackEnd<T1, T2>(algo: T1): T2 {
    return;
  }
}
