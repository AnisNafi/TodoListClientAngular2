import { Component, Input, OnInit } from '@angular/core';
import { TodoListComponent } from "../todo-list/todo-list.component";
import { ListsComponent } from "../lists/lists.component";
import { ListID, ItemJSON, TodoListWithItems, TodoListService } from "../todo-list.service";
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  label = new FormControl('', [Validators.required]);

  constructor(private todoListService: TodoListService, public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onCloseConfirm(label: string, difficulty: number, date: Date, details: string, address: string) {
    if (label != null && label !== "") {
      const id = this.todoListService.SERVER_CREATE_ITEM(this.data.id, label, false, {
        difficulty: difficulty,
        date: date,
        details: details,
        address: address
      });
      this.dialogRef.close(this.data);
    }
  }

  getErrorMessage() {
    return this.label.hasError('required') ? 'You must enter a value' :
      this.label.hasError('email') ? 'Not a valid email' :
        '';
  }

  onCloseCancel() {
    this.dialogRef.close(null);
  }
}
