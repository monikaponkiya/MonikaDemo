import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private _unsubscribe = new Subject<void>();
  Users!: User[];
  searchTerm = '';

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  getUsers() {
    this._userService.getUsers(this.searchTerm)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (res: User[]) => {
          this.Users = res;
        },
        error: (e) => console.error(e)
      });
  }

  onEdit(id: number) {
    this._router.navigate(['/user', id]);
  }

  onDelete(id: number) {
    let output: boolean;
    Swal.fire({
      title: 'Are you sure want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'success'
        )
        output = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'error'
        )
        output = false;
      }
      if (output) {
        this._userService.delete(id).pipe(takeUntil(this._unsubscribe))
          .subscribe({
            next: (res) => {
              this.getUsers();
            },
            error: (e) => console.error(e)
          });
      }
    })
  }
}
