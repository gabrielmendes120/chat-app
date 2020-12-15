import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/User';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { fail } from 'assert';

describe('Testing service user', () => {
  const baseUrl = 'http://localhost:3000';

  const dummyUserInfoResponse: User = {
    id: '1',
    imageBase64: '',
    email: 'gabriel@teste.com.br',
    username: 'gabrielmendesalves',
  };

  const dummyRegisterUserRequest = new FormData();
  dummyRegisterUserRequest.append('avatar', '');
  dummyRegisterUserRequest.append('username', 'gabrielmendesalves');
  dummyRegisterUserRequest.append('email', 'gabriel@teste.com.br');
  dummyRegisterUserRequest.append('password', '123');

  let injector: TestBed;
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    injector = getTestBed();
    userService = injector.inject(UserService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('login() should return data', () => {
    userService.login('gabriel@teste.com.br', '123').subscribe((resp) => {
      expect(resp).toEqual(dummyUserInfoResponse);
    });

    const req: TestRequest = httpMock.expectOne(`${baseUrl}/login`);

    expect(req.request.method).toBe('POST');

    req.flush(dummyUserInfoResponse);
  });

  it('validateIsAuthenticated() should return true', () => {
    userService.validateIsAuthenticated().then((resp) => {
      expect(resp.status).toEqual(200);
    });

    const req: TestRequest = httpMock.expectOne(`${baseUrl}/authenticated`);
    expect(req.request.method).toBe('GET');

    req.flush(200);
  });

  it('getUserById() should return data', () => {
    const userId = '1';
    userService.getUserById(userId).then((resp) => {
      expect(resp).toEqual(dummyUserInfoResponse);
    });

    const req: TestRequest = httpMock.expectOne(`${baseUrl}/users/${userId}`);
    expect(req.request.method).toBe('GET');

    req.flush(dummyUserInfoResponse);
  });

  it('getUserById() should return HttpErrorResponse', () => {
    const userId = '1';
    userService
      .getUserById(userId)
      .then((resp) => {
        fail('Should return Error');
      })
      .catch((resp) => {
        expect(resp).toEqual('Server Error');
      });

    const req: TestRequest = httpMock.expectOne(`${baseUrl}/users/${userId}`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('registerUser() should return successful', () => {
    userService.registerUser(dummyRegisterUserRequest).subscribe((resp) => {
      console.log(resp);
      expect(resp.status).toEqual(201);
    });

    const req: TestRequest = httpMock.expectOne(`${baseUrl}/users`);
    expect(req.request.method).toBe('POST');

    req.flush('Error', { status: 201, statusText: 'Created with successful' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
