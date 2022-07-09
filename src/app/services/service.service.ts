import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  baseURl = 'https://jobs-api.squareboat.info/api/v1/';
  logoutUser: boolean = false;
  
  constructor(private http: HttpClient) {}

  /**
   * Method for login 
   */
  login(email: string, pass: string) {
    return this.http.post(`${this.baseURl}auth/login`, {
      email: email,
      password: pass,
    });
  }

  /**
   * Method to get all the posted jobs
   */
  postedJobs() {
    return this.http.get(`${this.baseURl}recruiters/jobs`);
  }

  /**
   * Method to get the list of candidates applied
   */
  applicants(id: string) {
    return this.http.get(`${this.baseURl}recruiters/jobs/${id}/candidates`);
  }

  /**
   * Method for logout
   */
  logout() {
    localStorage.clear();
    this.logoutUser = true;
  }
}
