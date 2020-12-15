import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';

describe('Testing auth service', () => {
  const baseUrl = 'http://localhost:3000';

  let injector: TestBed;
  let auth: AuthGuardService;
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
    auth = new AuthGuardService(userService);
  });

  it('isAuthenticated() should return true', () => {
    userService.validateIsAuthenticated().then((resp) => {
      expect(resp.status).toEqual(200);
    });

    const req: TestRequest = httpMock.expectOne(
      `http://localhost:3000/authenticated`
    );
    expect(req.request.method).toBe('GET');
    req.flush(200);

    auth.isAuthenticated().then((resp) => {
      expect(resp).toBe(true);
    });
  });

  it('isAuthenticated() should return false', () => {
    userService.validateIsAuthenticated().then((resp) => {
      expect(resp.status).toEqual(401);
    });

    const req: TestRequest = httpMock.expectOne(
      `http://localhost:3000/authenticated`
    );
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 401, statusText: 'Access Denied' });

    auth.isAuthenticated().then((resp) => {
      expect(resp).toBe(false);
    });
  });

});
