import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    // Force scroll to top when component loads
    window.scrollTo(0, 0);
  }
}