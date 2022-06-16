import { TemplateTitleStrategyService } from './app/template-title-strategy.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, TitleStrategy } from '@angular/router';
import { AppComponent } from './app/app.component';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

//platformBrowserDynamic().bootstrapModule(AppModule)
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: TitleStrategy, useClass: TemplateTitleStrategyService
    },
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot([
      {
        path: '',
        loadComponent: () => import('./app/home/home.component').then(m => m.HomeComponent),
        providers: [],
        title: 'Home'
      },
      {
        path: 'cart', 
        loadComponent: () => import('./app/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart'
      }
    ]))
  ]
})
  .catch(err => console.error(err));
