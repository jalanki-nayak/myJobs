import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { ApplicationComponent } from './application/application.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  constructor(
    private service: ServiceService,
    public readonly dialog: MatDialog,
    private router: Router
  ) { }

  postedJobs: any;
  totalLength: any;
  page: number = 1;
  loginUser: string = '';
  loginModal = true;

  /**
   * Method to fetch the posted company data
   */
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.loginUser = user?.name;
    this.service.postedJobs().subscribe({
      next: (resdata: any) => {
        this.postedJobs = resdata.data.data;
        this.totalLength = resdata.data.data.length;
      },
    });

    /**
     * Method to set the time for modal
     */
    setTimeout(() => {
      this.loginModal = false;
    }, 3000);
  }

  /**
   * Method to view the applicants list for posted jobs
   */
  viewApplication(job: any) {
    this.dialog.open(ApplicationComponent, {
      width: '40vw',
      height: '80vh',
      autoFocus: false,
      panelClass: 'myapp-no-padding-dialog',
      data: { id: job?.id },
    });
  }

  /**
   * Method to navigate on home page after logout
   */
  onLogout() {
    this.service.logout();
    this.router.navigate(['/landing']);
    this.loginUser = '';
    this.postedJobs = '';
  }

  /**
   * Method to trim the length of location if greater than 10
   */
  locationLength(name: any): any {
    name = '' + name;
    if (name.length > 10) {
      name = name.slice(0, 10) + '...';
    }
    return name;
  }
}
