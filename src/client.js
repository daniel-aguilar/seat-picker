import { Subject } from 'rxjs';

export class Client {
  get updates() {
    return this._subject.asObservable();
  }

  constructor() {
    this._subject = new Subject();
    this.ws = new WebSocket('ws://localhost:8765');

    this.ws.onmessage = m =>
      this._subject.next(JSON.parse(m.data));
  }
}
