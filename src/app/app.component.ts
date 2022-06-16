import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component, Inject, Injectable, InjectionToken, NgModule, Optional, ViewChild, ViewContainerRef, OnInit, Injector, EnvironmentInjector, createEnvironmentInjector, ENVIRONMENT_INITIALIZER } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent implements OnInit {
  title = 'v14';
  @ViewChild('inner', { read: ViewContainerRef, static: true }) inner!: ViewContainerRef;
  constructor(private injector: Injector, private envInjector: EnvironmentInjector) { }
  ngOnInit(): void {
    const nodeInjector = Injector.create({
      providers: [{ provide: Service, useClass: NodeOverrideService }],
      parent: this.injector
    });

    const envInj = createEnvironmentInjector([
      { provide: Service, useClass: EnvOverrideService },
      {
        provide: ENVIRONMENT_INITIALIZER,
        useValue: () => console.log('New env injector created'),
        multi: true
      }
    ])
    this.inner.createComponent(InnerCmp, {
      injector: nodeInjector,
      environmentInjector: envInj
    });
  }
}


const TOKEN = new InjectionToken<string>('token');

@Injectable()
export class Service {
  constructor(@Optional() @Inject(TOKEN) readonly value: string) { }
}

class NodeOverrideService extends Service {
  constructor() {
    super('Node Override');
  }
}

class EnvOverrideService extends Service {
  constructor() {
    super('Env Override');
  }
}

@NgModule({ providers: [Service] })
export class Module { }

@Component({
  standalone: true,
  template: `Inner {{service.value}}`,
  imports: [Module],
  selector: 'inner-cmp'
})
export class InnerCmp {
  constructor(public service: Service) { }
}

