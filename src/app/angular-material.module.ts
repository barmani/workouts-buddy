import { NgModule } from '@angular/core';
import { MatDialogModule,
         MatFormFieldModule,
         MatInputModule,
         MatToolbarModule,
         MatRadioModule,
         MatCheckboxModule,
         MatButtonModule,
         MatSlideToggleModule,
         MatStepperModule,
         MatExpansionModule,
         MatSidenavModule,
         MatSnackBarModule,
         MatSelectModule,
         MatAutocompleteModule,
         MatPaginatorModule } from '@angular/material';
         
@NgModule({
  exports: [
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatPaginatorModule,
  ]
})
export class AngularMaterialModule {}
