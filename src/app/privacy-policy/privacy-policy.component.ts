import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Force scroll to top when component loads
    window.scrollTo(0, 0);
  }
}