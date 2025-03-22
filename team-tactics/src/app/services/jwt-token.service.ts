import { Injectable } from '@angular/core';
import { JwtClaim } from '../interfaces/jwt-claim';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  constructor() { }

  getUserId() {
    return this.getJwtClaim().nameId;
  }

  getJwtClaim(): JwtClaim {
    let jsonObject = JSON.parse(atob(sessionStorage.getItem("accessToken")!.split('.')[1]));

    return {
      nameId: Number.parseInt(jsonObject.nameid),
      email: jsonObject.email,
      unique_name: jsonObject.unique_name,
      expiry: Number.parseInt(jsonObject.exp)
    } as JwtClaim;
  }
}
