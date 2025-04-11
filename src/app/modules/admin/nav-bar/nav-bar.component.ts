import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "src/app/service/storage.service";
import { UpdateemployeeComponent } from "../employee/updateemployee/updateemployee.component";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  @Output() togglesSidebarForMe: EventEmitter<any> = new EventEmitter();

  dialog: any;
  name: any;
  roleName: any;
  sideBaropen = true;

  constructor(private router: Router, private localstorage: StorageService) {}

  ngOnInit(): void {
    this.name = this.localstorage.getdata().firstName;
    this.roleName = this.localstorage.getRoles();
  }

  switch() {}
  logout() {
    this.router.navigate(["admin/logout"]);
  }
  togglesidebar() {
    if (this.sideBaropen == true) {
      this.sideBaropen = false;
    } else if (this.sideBaropen == false) {
      this.sideBaropen = true;
    }
    console.log("cliked");
  }

  // sideBarToggler(){
  //   this.sideBaropen = !this.sideBaropen;
  // }

  employeeEdit() {
    console.log("in the edit method : ");
    let userId = this.localstorage.getUserId();
    console.log("in the edit method : " + userId);
    this.updatePopup(userId);
    //this.api.getEmployeeById(AppSetting.TIEUP_ENDPOINT + 'getUserInfoById/' + id)
  }

  updatePopup(id: any) {
    this.dialog.open(UpdateemployeeComponent, {
      width: "1200px",
      exitAnimationDuration: "1000ms",
      enterAnimationDuration: "1000ms",
      data: {
        id: id,
      },
    });
  }
}
