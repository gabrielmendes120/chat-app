import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.url);
  }

  loginUser(infoUser: User) {
    this.socket.emit('login', infoUser);
  }

  sendMessage(infoUser: User, message: string) {
    this.socket.emit('chat message', infoUser, message);
  }

  getUsersOnline() {
    return new Observable((observer: { next: (users: User[]) => void }) => {
      this.socket.on('login', (users: User[]) => {
        observer.next(users);
      });
    });
  }

  getChatMessage() {
    return new Observable((observer) => {
      this.socket.on('chat message', (infoUser: User, message: string) => {
        observer.next(new Message(infoUser, message));
      });
    });
  }

}
