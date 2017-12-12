import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { TodoListWithItems, TodoListService } from "../todo-list.service";
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddFormComponent } from '../add-form/add-form.component';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;
  private creatingItem = false;
  data: {};
  private editingTitle = false;

  constructor(private todoListService: TodoListService, public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  createItem(label: string, difficulty: number, date: Date, details: string, address: string) {
    const id = this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, false, {
      difficulty: difficulty,
      date: date,
      details: details,
      address: address
    });
    // this.list.state++;
  }

  createItemById(listId: string, label: string, difficulty: number, date: Date, details: string, address: string) {
    const id = this.todoListService.SERVER_CREATE_ITEM(listId, label, false, {
      difficulty: difficulty,
      date: date,
      details: details,
      address: address
    });
    // this.list.state++;
  }


  delete() {
    if (confirm("Do you want to delete this list ?")) {
      this.todoListService.SERVER_DELETE_LIST(this.list.id);
    }
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  setColor(color: string) {
    console.log("setColor", color);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }

  editVisibility() {
    if (this.creatingItem === true) {
      this.creatingItem = false;
    } else {
      this.creatingItem = true;
    }
  }

  isCreatingItem(): boolean {
    return this.creatingItem;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddFormComponent, {
      width: '50%',
      data: this.list
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data = result;
    });
  }

  setTitle(title: string): void {
    if (title !== "") {
      this.todoListService.SERVER_UPDATE_LIST_NAME(this.list.id, title);
    }
    this.editListName();
  }

  isEditingTitle(): boolean {
    return this.editingTitle;
  }

  editListName() {
    this.editingTitle = !this.editingTitle;
  }

  duplicate(): void {
    const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(this.list.name +' (1)', this.list.data);
    for(const i of this.list.items) {
      this.createItemById(localListID, i.label, i.data["difficulty"], i.data["date"], i.data["details"], i.data["address"]);
    }
  }

  createList(name: string) {
    if (name !== "") {
      const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(name, {
        color: "#FF0000",
        state: 0
        // Add other data here...
      });
    }
  }
}
