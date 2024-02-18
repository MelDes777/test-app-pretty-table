import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTable, MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import mockData from '../mock-data/data'
import { UserData } from '../models/UserData';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe, CommonModule} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    'id',
    'firstName',
    'lastName',
    'isActive',
    'balance',
    'picture',
    'age',
    'company',
    'email',
    'address',
    'tags',
    'favoriteFruit',
  ];

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

  id = this.form.get('id');
  firstName = this.form.get('firstName');
  lastName = this.form.get('lastName');
  isActive = this.form.get('isActive');
  balance = this.form.get('balance');
  picture = this.form.get('picture');
  age = this.form.get('age');
  company = this.form.get('company');
  email = this.form.get('email');
  address = this.form.get('address');
  tags = this.form.get('tags');
  favoriteFruit = this.form.get('favoriteFruit');

  columnDefinitions = [
    { def: 'id', label: 'ID', hide: this.id ? this.id.value : false },
    {
      def: 'firstName',
      label: 'FirstName',
      hide: this.firstName ? this.firstName.value : false,
    },
    {
      def: 'lastName',
      label: 'LastName',
      hide: this.lastName ? this.lastName.value : false,
    },
    {
      def: 'isActive',
      label: 'isActive',
      hide: this.isActive ? this.isActive.value : false,
    },
    {
      def: 'balance',
      label: 'Balance',
      hide: this.balance ? this.balance.value : false,
    },
    {
      def: 'picture',
      label: 'Picture',
      hide: this.picture ? this.picture.value : false,
    },
    { def: 'age', label: 'Age', hide: this.age ? this.age.value : false },
    {
      def: 'company',
      label: 'Company',
      hide: this.company ? this.company.value : false,
    },
    {
      def: 'email',
      label: 'Email',
      hide: this.email ? this.email.value : false,
    },
    {
      def: 'address',
      label: 'Address',
      hide: this.address ? this.address.value : false,
    },
    { def: 'tags', label: 'Tags', hide: this.tags ? this.tags.value : false },
    {
      def: 'favoriteFruit',
      label: 'FavoriteFruit',
      hide: this.favoriteFruit ? this.favoriteFruit.value : false,
    },
  ].map(column => ({
    ...column,
    hide: column.hide !== null ? column.hide : false
}));;

getDisplayedColumns() {
  this.columns = this.columnDefinitions
    .filter((cd) => !cd.hide)
    .map((cd) => cd.def);
}

ngOnInit(): void {
  this.processMockData();
  this.dataSourceFiltered = new MatTableDataSource(this.dataSource);
}

ngAfterViewInit() {

  let o1: Observable<boolean> = this.id!.valueChanges;
  let o2: Observable<boolean> = this.firstName!.valueChanges;
  let o3: Observable<boolean> = this.lastName!.valueChanges;
  let o4: Observable<boolean> = this.isActive!.valueChanges;
  let o5: Observable<boolean> = this.balance!.valueChanges;
  let o6: Observable<boolean> = this.picture!.valueChanges;
  let o7: Observable<boolean> = this.age!.valueChanges;
  let o8: Observable<boolean> = this.company!.valueChanges;
  let o9: Observable<boolean> = this.email!.valueChanges;
  let o10: Observable<boolean> = this.address!.valueChanges;
  let o11: Observable<boolean> = this.tags!.valueChanges;
  let o12: Observable<boolean> = this.favoriteFruit!.valueChanges;

  merge(o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12)
    .subscribe((v) => {
      this.columnDefinitions[0].hide = this.id!.value;
      this.columnDefinitions[1].hide = this.firstName!.value;
      this.columnDefinitions[2].hide = this.lastName!.value;
      this.columnDefinitions[3].hide = this.isActive!.value;
      this.columnDefinitions[4].hide = this.balance!.value;
      this.columnDefinitions[5].hide = this.picture!.value;
      this.columnDefinitions[6].hide = this.age!.value;
      this.columnDefinitions[7].hide = this.company!.value;
      this.columnDefinitions[8].hide = this.email!.value;
      this.columnDefinitions[9].hide = this.address!.value;
      this.columnDefinitions[10].hide = this.tags!.value;
      this.columnDefinitions[11].hide = this.favoriteFruit!.value;

      console.log('Column definitions:', this.columnDefinitions);

      this.getDisplayedColumns();
      this.displayedColumns = this.columns;
  });

  this.getDisplayedColumns();

  this.dataSourceFiltered.paginator = this.paginator;
  this.dataSourceFiltered.sort = this.sort;
}

  processMockData(): void {
    this.dataSource = mockData.map((data) => {
      const processedData: UserData = {
        _id: data._id,
        isActive: data.isActive || false, // Присваиваем false, если значение не определено
        balance: data.balance || '', // Присваиваем пустую строку, если значение не определено
        picture: data.picture || '', // Присваиваем пустую строку, если значение не определено
        age: data.age || 0, // Присваиваем 0, если значение не определено
        name: {
          first: data.name?.first || '', // Присваиваем пустую строку, если значение не определено
          last: data.name?.last || '', // Присваиваем пустую строку, если значение не определено
        },
        company: data.company || '', // Присваиваем пустую строку, если значение не определено
        email: data.email || '', // Присваиваем пустую строку, если значение не определено
        address: data.address || '', // Присваиваем пустую строку, если значение не определено
        tags: data.tags || [], // Присваиваем пустой массив, если значение не определено
        favoriteFruit: data.favoriteFruit || '', // Присваиваем пустую строку, если значение не определено
      };

      return processedData;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFiltered.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFiltered.paginator) {
      this.dataSourceFiltered.paginator.firstPage();
    }
  }

  
}
