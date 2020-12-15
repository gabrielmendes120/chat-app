import { User } from './User';

export class Message {
  imageBase64: string;
  username: string;
  today: number = Date.now();
  message: string;

  constructor(infoUser: User, message: string) {
    this.username = infoUser.username;
    this.imageBase64 = infoUser.imageBase64;
    this.message = message;
  }
}
