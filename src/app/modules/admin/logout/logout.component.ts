import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "src/app/service/storage.service";

@Component({
  selector: "app-logout",

  templateUrl: "./logout.component.html",
  styleUrl: "./logout.component.css",
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private localstorage: StorageService) {}

  ngOnInit(): void {}

  logout(): void {
    this.localstorage.clearstroage();
    this.router.navigate([""]);
  }
}
