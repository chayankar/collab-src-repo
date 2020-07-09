import { TestBed } from '@angular/core/testing';

import { PopupNotifyService } from './popup-notify.service';

describe('PopupNotifyService', () => {
  let service: PopupNotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupNotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
