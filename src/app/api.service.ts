import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private login = 'https://Datsmallbird-api.cloudsigning.co/check/v1/login'; //Login
  private logout = 'https://Datsmallbird-api.cloudsigning.co/check/v1/logout'; //Logout
  private subject = 'https://Datsmallbird-api.cloudsigning.co/check/v1/subject/search'; //subject
  private question = 'https://Datsmallbird-api.cloudsigning.co/check/v1/question/search'; //question
  private answer = 'https://Datsmallbird-api.cloudsigning.co/check/v1/answer'; //answer

  constructor(private http: HttpClient) { }

  postLogin(body: any): Observable<any> {
    return this.http.post<any>(this.login, body);
  }

  postLogout(body: any): Observable<any> {
    return this.http.post<any>(this.logout, body);
  }

  postSubject(body: any): Observable<any> {
    return this.http.post<any>(this.subject, body);
  }

  postQuestion(body: any): Observable<any> {
    return this.http.post<any>(this.question, body);
  }

  postAnswer(body: any): Observable<any> {
    return this.http.post<any>(this.answer, body);
  }
}
