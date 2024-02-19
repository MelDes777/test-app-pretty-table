import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTable, MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { UserData } from '../models/UserData';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe, CommonModule} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { merge, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { delay, debounceTime, mergeMap } from 'rxjs/operators';
import mockData from '../mock-data/data'

@Component({
  selector: 'app-pretty-table',
  templateUrl: './pretty-table.component.html',
  styleUrls: ['./pretty-table.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    DatePipe,
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
})
export class PrettyTableComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'isActive', 'balance', 'picture', 'age',
    'company', 'email', 'address', 'tags', 'favoriteFruit',
  ];

  isLoadingResults = false;

  dataSource: UserData[] = [];
  dataSourceFiltered!: MatTableDataSource<UserData>;
  columns: string[] = [];

  @ViewChild(MatTable) table!: MatTable<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {}

  form: FormGroup = new FormGroup({
    id: new FormControl(false),
    firstName: new FormControl(false),
    lastName: new FormControl(false),
    isActive: new FormControl(false),
    balance: new FormControl(false),
    picture: new FormControl(false),
    age: new FormControl(false),
    company: new FormControl(false),
    email: new FormControl(false),
    address: new FormControl(false),
    tags: new FormControl(false),
    favoriteFruit: new FormControl(false),
  });

  columnDefinitions = [
    { def: 'id', label: 'ID' },
    { def: 'firstName', label: 'FirstName' },
    { def: 'lastName', label: 'LastName' },
    { def: 'isActive', label: 'isActive' },
    { def: 'balance', label: 'Balance' },
    { def: 'picture', label: 'Picture' },
    { def: 'age', label: 'Age' },
    { def: 'company', label: 'Company' },
    { def: 'email', label: 'Email' },
    { def: 'address', label: 'Address' },
    { def: 'tags', label: 'Tags' },
    { def: 'favoriteFruit', label: 'FavoriteFruit' },
  ];

formControls = Object.values(this.form.controls) as FormControl[];



ngOnInit(): void {
  this.processMockData();
  this.isLoadingResults = true;
}

ngAfterViewInit() {
  merge(...this.formControls.map(control => control.valueChanges.pipe(debounceTime(300))))
    .subscribe(() => {
      this.getDisplayedColumns();
    });

  of(null).pipe(
    mergeMap(() => of(null).pipe(delay(this.getRandomDelay())))
  ).subscribe(() => {
    this.dataSourceFiltered = new MatTableDataSource(this.dataSource);
    this.dataSourceFiltered.paginator = this.paginator;
    this.dataSourceFiltered.sort = this.sort;
    this.isLoadingResults = false;
    
  });
}

getDisplayedColumns() {
  this.columns = this.columnDefinitions
    .filter(cd => !this.form.get(cd.def)?.value)
    .map(cd => cd.def);
    
    this.displayedColumns = this.columns;

    if (this.dataSourceFiltered) {
      this.dataSourceFiltered.paginator = this.paginator;
      this.dataSourceFiltered.sort = this.sort;
    }
}

processMockData(): void {
  this.dataSource = mockData.map(data => ({
    _id: data._id ?? '',
    isActive: data.isActive ?? false,
    balance: data.balance ?? '',
    picture: data.picture ?? '',
    age: data.age ?? 0,
    name: {
      first: data.name?.first ?? '',
      last: data.name?.last ?? '',
    },
    company: data.company ?? '',
    email: data.email ?? '',
    address: data.address ?? '',
    tags: data.tags ?? [],
    favoriteFruit: data.favoriteFruit ?? '',
  }));
}

private getRandomDelay(): number {
  return Math.floor(Math.random() * 1000) + 1000;
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFiltered.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFiltered.paginator) {
      this.dataSourceFiltered.paginator.firstPage();
    }
  }

  
}
