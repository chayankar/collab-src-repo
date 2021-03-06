import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBaseUrl } from 'app/constants/service-base-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    url = this.createUrl(url);
    return this.httpClient.get(url);
  }

  post(url: string, data: any) {
    url = this.createUrl(url);
    return this.httpClient.post(url, data, { withCredentials: true });
  }

  private createUrl(url: string): string {
    return ServiceBaseUrl.AppBaseUrl + url;
  }
}