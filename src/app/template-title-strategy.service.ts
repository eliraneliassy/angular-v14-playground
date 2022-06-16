import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TemplateTitleStrategyService extends TitleStrategy {
  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if(title) {
      this.title.setTitle(`My awesome app - ${title}`)
    }
  }

  constructor(private title: Title) { 
    super()
  }
}
