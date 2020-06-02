/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AesEncryptionService } from './aes-encryption.service';

describe('Service: AesEncryption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AesEncryptionService]
    });
  });

  it('should ...', inject([AesEncryptionService], (service: AesEncryptionService) => {
    expect(service).toBeTruthy();
  }));
});
