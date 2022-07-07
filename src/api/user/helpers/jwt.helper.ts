import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export interface AppJwtPayload extends jwt.JwtPayload {
  id: string | ObjectId | number;
}

@Injectable()
export class JwtHelper {
  private tokenSecret: string;
  private tokenExpire: string;
  private refreshTokenSecret: string;
  private refreshTokenExpire: string;
  constructor(private readonly config: ConfigService) {
    this.tokenSecret = config.get('server.tokenSecret');
    this.tokenExpire = config.get('server.tokenExpire');
    this.refreshTokenSecret = config.get('server.refreshTokenSecret');
    this.refreshTokenExpire = config.get('server.refreshTokenExpire');
  }

  generateAccessTokenSync(payload: AppJwtPayload) {
    return jwt.sign(payload, this.tokenSecret, {
      expiresIn: this.tokenExpire,
    });
  }

  verifyAccessTokenSync(accessToken: string) {
    return jwt.verify(accessToken, this.tokenSecret);
  }

  decodeAccessTokenSync(accessToken: string) {
    return jwt.decode(accessToken);
  }

  generateRefreshTokenSync(payload: AppJwtPayload) {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpire,
    });
  }

  verifyRefreshTokenSync(refreshToken: string) {
    return jwt.verify(refreshToken, this.refreshTokenSecret);
  }

  decodeRefreshTokenSync(refreshToken: string) {
    return jwt.decode(refreshToken);
  }
}
