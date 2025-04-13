import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  generateVisualization(language: string, code: string) {
    return lastValueFrom(
      this.http.post<any>(`${this.API_URL}/generate`, { language, code })
    );
  }
}
