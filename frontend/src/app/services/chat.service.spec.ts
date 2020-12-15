import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import * as io from 'socket.io-client';
import { ChatService } from './chat.service';
import { User } from '../models/User';

describe('Testing chat service', () => {
  const baseUrl = 'http://localhost:3000';

  const dummyUsersResponse: User[] = [
    {
      id: '1',
      imageBase64: '',
      email: 'gabriel@teste.com.br',
      username: 'gabrielmendesalves',
    },
    {
      id: '2',
      imageBase64: '',
      email: 'gabrie2@teste.com.br',
      username: 'gabrielmendesalve2',
    },
  ];

  let injector: TestBed;
  let chatService: ChatService;
  let socket: SocketIOClient.Socket;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [chatService],
    });

    injector = getTestBed();
    chatService = injector.inject(ChatService);
    socket = io(this.baseUrl);
  });

 
});
