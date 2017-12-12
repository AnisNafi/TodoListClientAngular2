import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

import { TodoListService } from "./todo-list.service";
import {HttpModule} from '@angular/http';

import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { AddFormComponent } from './add-form/add-form.component';
import { DialogFormComponent } from './dialog-form/dialog-form.component';

const appRoutes: Routes = [
  {
    path: 'lists',
    // canActivate: [AuthService],
    component: ListsComponent,
    data: { /*title: ''*/ }
  }
];

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
  ]
})
  export class PlunkerMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    ListsComponent,
    AddFormComponent,
    DialogFormComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    PlunkerMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AddFormComponent,
    DialogFormComponent
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
