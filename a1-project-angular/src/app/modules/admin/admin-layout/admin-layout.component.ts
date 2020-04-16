import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  isCollapsed = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUserOut() {
    this.authService.signOut();
  }
}
