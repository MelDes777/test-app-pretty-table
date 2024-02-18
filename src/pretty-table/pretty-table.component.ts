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
import {DatePipe} from '@angular/common';

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
    DatePipe
  ],
})
export class PrettyTableComponent implements AfterViewInit  {

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
  
    @ViewChild(MatTable) table!: MatTable<UserData>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor() {}


  ngAfterViewInit() {
    this.processMockData();
    this.dataSourceFiltered = new MatTableDataSource(this.dataSource);
    
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
