import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrettyTableComponent } from '../pretty-table/pretty-table.component';

const routes: Routes = [
  {path: '', component: PrettyTableComponent},
  {path: "**", redirectTo: "", component: PrettyTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
