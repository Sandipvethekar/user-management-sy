import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { User } from './models/user';
import { UserserviceService } from './userservice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management-system';
  displayedColumns: string[] = ['index', 'name', 'email', 'role', 'actions'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog,
    private userService: UserserviceService,
  ) { }
  ngOnInit(): void {
    this.loadUsers();
  }
  openAddEditForm(user?: User): void {
    try {
      const dialogRef = this._dialog.open(UserAddEditComponent, {
        data: { user }
      });

      dialogRef.afterClosed().subscribe(
        result => {
          if (result) {
            try {
              this.loadUsers();
              Swal.fire('Success', 'User added successfully!', 'success');
            } catch (error) {
              console.error('Error loading users after dialog close:', error);
              Swal.fire('Error', 'Failed to load users after adding/updating.', 'error');
            }
          }
        },
        error => {
          console.error('Error occurred after dialog close:', error);
          Swal.fire('Error', 'Something went wrong after closing the dialog!', 'error');
        }
      );
    } catch (error) {
      console.error('Error opening dialog:', error);
      Swal.fire('Error', 'Failed to open the dialog.', 'error');
    }
  }

  openAddEditForm1(user: User, index: number): void {
    const actualIndex = index + (this.paginator.pageIndex * this.paginator.pageSize);
    const dialogRef = this._dialog.open(UserAddEditComponent, {
      data: { user, index: actualIndex }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.loadUsers();
          Swal.fire('Success', 'User updated successfully!', 'success');
        }
      },
      error => {
        console.error('Error occurred after dialog close:', error);
        Swal.fire('Error', 'Something went wrong after closing the dialog!', 'error');
      }
    );
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUsers(): void {
    try {
      const users = this.userService.getUsers();
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    } catch (error) {
      console.error('Error loading users:', error);
      Swal.fire('Error', 'Failed to load users.', 'error');
    }
  }


  deleteUser(index: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.userService.deleteUser(index);
          this.loadUsers();
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire('Error', 'Failed to delete user.', 'error');
        }
      }
    });
  }
  getDisplayedIndex(index: number): number {
    if (this.paginator) {
      return index + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
    } else {
      return index + 1;
    }
  }
}
