import { TestBed } from '@angular/core/testing';

import { TemplateTitleStrategyService } from './template-title-strategy.service';

describe('TemplateTitleStrategyService', () => {
  let service: TemplateTitleStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateTitleStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
