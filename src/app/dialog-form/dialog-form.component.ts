import { Component, Input, OnInit } from '@angular/core';
import { TodoListComponent } from "../todo-list/todo-list.component";
import { ListsComponent } from "../lists/lists.component";
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ListID, ItemJSON, TodoListWithItems, TodoListService } from "../todo-list.service";
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {

  constructor(private todoListService: TodoListService, public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }


  onCloseConfirm(cathegorie: string, label: string, difficulty: number, date: Date, details: string, address: string) {
    console.log(date);
    if (label === "") {
      this.todoListService.SERVER_DELETE_ITEM(this.data.listId, this.data.item.id);
    } else if (this.todoListService.getList(this.data.listId).name !== cathegorie) {
        this.todoListService.SERVER_CREATE_ITEM(this.getListByName(cathegorie).id, label, false, {
          difficulty: difficulty,
          date: date,
          details: details,
          address: address
        });
        this.todoListService.SERVER_DELETE_ITEM(this.data.listId, this.data.item.id);
      } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.data.listId, this.data.item.id, label);
      this.todoListService.SERVER_UPDATE_ITEM_DATA(this.data.listId, this.data.item.id, { difficulty, date, details, address });
    }
    this.dialogRef.close(this.data);
  }

  onCloseCancel() {
    this.dialogRef.close(null);
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  getListByName(name: string): TodoListWithItems {
    for (let l of this.getLists()) {
      if (l.name == name) return l;
    }
    return null;
  }

  getListNameById(listId : string) : string {
    return this.todoListService.getList(listId).name;
  }

  getDateEndDateFormat(date): string {
    if (!date) {return ""; }
    if (date === "") {return ""; }


    return new Date(date).toISOString();
  }
}
