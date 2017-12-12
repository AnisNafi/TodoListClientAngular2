import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, Inject } from '@angular/core';
import { ListID, ItemJSON, TodoListService } from "../todo-list.service";
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import {
  MatDialog, MatDialogRef, MAT_DIALOG_DATA,
} from '@angular/material';
import {ViewChild} from "@angular/core";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  @Input() color: string;
  @ViewChild('isChecked') checkbox;
  private editingLabel = false;
  private editingItem = false;
  data: { clicked: false; };

  constructor(private todoListService: TodoListService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  setLabel(label: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
    }
    this.editLabel(false);
  }

  setItemData(label: string, difficulty: number, date: Date, details: string, address: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
      this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, { difficulty, date, details, address });
    }
    this.editLabel(false);
    this.editingItem = false;
  }

  isEditingItem() {
    return this.editingItem;
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  editVisibility() {
    if (this.editingLabel === true) {
      this.editingLabel = false;
    } else {
      this.editingLabel = true;
    }
    if (this.item.data[0] === true) {
      this.item.data[0] = false;
    } else {
      this.item.data[0] = true;
    }
  }

  check(checked: boolean) {
    if(new Date(this.getDate()).getTime() > Date.now())
      this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
    this.checkbox.checked = this.item.checked;
  }

  delete() {
    if (confirm("Do you really want to delete the item ?")) {
      this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
    }
  }

  openDialogModify(): void {
    let dialogRef = this.dialog.open(DialogFormComponent, {
      width: '50%',
      data: this
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
    });
  }

  colorLigne() {
    let color;
    const today: Date = new Date();
    if (this.getDate() === null) color = 'white';
    else {
      const date: Date = new Date(this.getDate());
      if (date.getTime() <= today.getTime()) color = "#C62828";
      else if ((date.getTime() - today.getTime() <= 172800000) && (date.getTime() > today.getTime())) color = "#FFD54F";
    }
    return color;
  }

  colorDate() {
    let styles ;
    if (this.colorLigne() === "#FFD54F" || this.colorLigne() === "#C62828") {
      styles = {
        'background-color': this.colorLigne(),
        'color': 'white'
      };
    } else {
      styles = {
        'background-color': this.colorLigne()
      };
    }
    return styles;
  }

  getDate() {
    return this.item.data['date'] ? this.item.data['date'] : null;
  }


  hasDate(): boolean {
    if (this.getDate() == null) { return false;
    }else { return true; }
  }
}


