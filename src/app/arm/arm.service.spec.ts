/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArmService } from './arm.service';

describe('ArmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArmService]
    });
  });

  it('should ...', inject([ArmService], (service: ArmService) => {
    expect(service).toBeTruthy();
  }));
});
