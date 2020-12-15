export class SessionStorageHelper {

    static setIdUser(id: string) {
        sessionStorage.setItem('user-id', id);
    }

    static getIdUser(): string {
       return sessionStorage.getItem('user-id');
    }
}