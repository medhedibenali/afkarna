import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite-user-dialog',
  imports: [  ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatSelectModule],
  templateUrl: './invite-user-dialog.component.html',
  styleUrl: './invite-user-dialog.component.css'
})
export class InviteUserDialogComponent {
  inviteUserForm : FormGroup;
  Dialogdata:any;
  constructor(
    private dialogRef: MatDialogRef<InviteUserDialogComponent>,
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.inviteUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.Dialogdata = data;
  }

  onSubmit(){
    if(this.inviteUserForm.valid){
      console.log(this.inviteUserForm.value.email);
      console.log(this.Dialogdata.workspaceId);
    }

      // Send to service of notifications the dto of creating the notification
      this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }
}
