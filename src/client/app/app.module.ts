import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [AppComponent, HeroesComponent, LoginComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    HeroService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
