import { Injectable } from '@angular/core';
import { JwtClaim } from '../interfaces/jwt-claim';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  constructor() { }

  getUserId() {
    return this.getJwtClaim().userId;
  }

  getJwtClaim(): JwtClaim {
    let jsonObject = JSON.parse(atob(sessionStorage.getItem("accessToken")!.split('.')[1]));

    return {
      userId: jsonObject.userId
    } as JwtClaim;
  }
}
