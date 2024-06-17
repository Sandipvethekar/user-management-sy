import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../models/user';
import { UserserviceService } from '../userservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  empForm!: FormGroup;
  isEditMode: boolean = false;
  userIndex!: number;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserAddEditComponent>,
    private _userservice: UserserviceService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, index: number }
  ) { }
  ngOnInit(): void {
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    if (this.data && this.data.user) {
      this.isEditMode = true;
      this.empForm.patchValue(this.data.user);
    }
  }

  onSubmit(): void {
    if (this.empForm.valid) {
      if (this.isEditMode) {
        this._userservice.updateUser(this.data.index, this.empForm.value);
      } else {
        this._userservice.addUser(this.empForm.value);
      }
      this.dialogRef.close(true);
    }
  }
}



