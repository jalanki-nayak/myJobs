import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})

export class LandingComponent implements OnInit {
  constructor(private router: Router, public service: ServiceService) {}
  loginUser: string = '';
  logoutModal = true;

  whyUs = [
    {
      title: 'Get More Visibility',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      title: 'Organize Your Candidates',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      title: 'Verify Their Abilities',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  /**
   * Method to get the present data and navigate to login and logout page
   */
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.loginUser = user?.name;
    setTimeout(() => {
      this.logoutModal = false;
    }, 3000);
  }
  login() {
    this.router.navigate(['/login']);
  }
  onLogout() {
    this.service.logout();
    this.router.navigate(['/landing']);
    this.loginUser = '';
  }
}
