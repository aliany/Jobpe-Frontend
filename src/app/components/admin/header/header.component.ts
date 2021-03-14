import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { BehaviorService } from '../../../services/behavior.service';
import { UserData } from '../../../models/user.class';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { LoginData } from '../../../models/login.class';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideButton: boolean;
  rol: string;
  email: string;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private behaviorService: BehaviorService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.behaviorService.user$.subscribe((data: UserData) => {
      data?.token !== undefined ? this.hideButton = false : this.hideButton = true;
      data?.rol !== undefined ? this.rol = data.rol : this.rol = '';
      data?.email !== undefined ? this.email = data.email : this.email = '';
    });
  }

  login(checkIn: boolean) {

    let title: string;
    let checkInDialog: boolean;
    let width: string;

    if (checkIn) {
      title = 'Registrarse';
      checkInDialog = true;
      width = '800px';
    } else {
      title = 'Iniciar Sesión';
      checkInDialog = false;
      width = '550px';
    }

    const dialogRef = this.dialog.open(LoginComponent, {
      width: width,
      data: {
        title: title,
        checkInDialog: checkInDialog
      },
      disableClose: true
    });

    dialogRef.componentInstance.loginEvent.subscribe(() => {
      dialogRef.close();
      let user: LoginData = new LoginData();
      user = dialogRef.componentInstance.loginObject;
      if (checkInDialog) {
        this.userService(user);       
      } else {
        this.loginService(user);
      }
    });
  }

  userService(user) {
    this.authService.user(user).subscribe(
      (data) =>  this.loginService(user)
    );
  }

  loginService(user) {
    this.authService.login(user).subscribe(
      (data) => this.sameService(data)
    );
  }

  sameService(data) {
    localStorage.setItem('token', data['token']);
    this.behaviorService.sendUser(data);
    this.router.navigate(['oferta']);
  }

  logout() {
    localStorage.removeItem('token');
    this.behaviorService.sendUser(null);
    this.router.navigate(['oferta']);
  }

  profile() {
    this.dialog.open(ProfileComponent, {
      width: '800px',
      disableClose: true
    });
  }

}
