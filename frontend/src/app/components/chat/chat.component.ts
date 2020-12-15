import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { SessionStorageHelper } from 'src/app/helper/session-storage-helper';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  infoUser: User;

  infoUsersOnline: User[] = [];

  message: string;

  messages: Message[] = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initChatApp();
    this.observerUsersOnline();
    this.observerChatMessages();
  }

  initChatApp() {
    const userId = SessionStorageHelper.getIdUser();
    this.userService
      .getUserById(userId)
      .then((infoUser) => {
        this.infoUser = infoUser;
      })
      .then(() => {
        this.loginUser();
      })
      .catch(() => {
        console.log('Error init chat app');
      });
  }

  loginUser() {
    this.chatService.loginUser(this.infoUser);
  }

  observerUsersOnline() {
    this.chatService.getUsersOnline().subscribe((users: User[]) => {
      if (users == null || users === undefined) {
        return;
      }
      this.infoUsersOnline = users;
    });
  }

  observerChatMessages() {
    this.chatService.getChatMessage().subscribe((message: Message) => {
      if (message == null || message === undefined) {
        return;
      }
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (!this.message) {
      return;
    }
    this.chatService.sendMessage(this.infoUser, this.message);
    this.message = '';
  }
}
