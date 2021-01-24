import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from './services/chat.service';
import { ChatComponent } from './components/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AuthGuard } from './guard/auth.guard';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    SafeHtmlPipe,
    FileUploadComponent,
    FieldErrorDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [
    ChatService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
