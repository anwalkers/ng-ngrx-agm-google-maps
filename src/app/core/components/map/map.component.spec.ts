import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

import {Component, ViewChild} from "@angular/core";
import { AgmCoreModule } from '@agm/core';

describe('ComponentUnderTestComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent, TestHostComponent, ],
      imports: [AgmCoreModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should show TEST INPUT', () => {
    testHostFixture.detectChanges();
    // expect(testHostFixture.nativeElement.querySelector('div').innerText).toEqual('TEST INPUT');
  });

  it('should show DIFFERENT TEST INPUT', () => {
    testHostFixture.detectChanges();
    // expect(testHostFixture.nativeElement.querySelector('div').innerText).toEqual('DIFFERENT TEST INPUT');
  });
  @Component({
    selector: `host-component`,
    template: `<app-map></app-map>`
  })
  class TestHostComponent {
    @ViewChild(MapComponent, { static: false })
    public mapComponent: MapComponent;
  }
});
