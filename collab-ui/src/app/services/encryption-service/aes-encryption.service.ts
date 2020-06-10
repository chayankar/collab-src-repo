import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';
import { EncryptionKey } from 'app/models/EncryptionKey';

@Injectable({
  providedIn: 'root'
})
export class AesEncryptionService {

  constructor() { }

  encrypt(encKey: EncryptionKey, data: string): string {
    const key = CryptoJs.enc.Utf8.parse(encKey.key);
    const iv = CryptoJs.enc.Utf8.parse(encKey.iv);
    const encData: string = CryptoJs.enc.Utf8.parse(data);

    return CryptoJs.AES.encrypt(encData, key,
      {
        keySize: 128 / 8,
        iv: iv,
        padding: CryptoJs.pad.Pkcs7,
        mode: CryptoJs.mode.CBC
      }).toString();
  }

}
