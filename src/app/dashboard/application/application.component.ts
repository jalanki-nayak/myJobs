import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})

export class ApplicationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private service: ServiceService,
    public readonly dialogRef: MatDialogRef<ApplicationComponent>
  ) {}

  applicationData: any;

  /**
   * Method to fetch the applicants data 
   */
  ngOnInit(): void {
    console.log(this.data);
    this.service.applicants(this.data?.id).subscribe({
      next: (resdata: any) => {
        this.applicationData = resdata?.data;
      },
    });
  }

  /**
   * Method to close the applicants list modal
   */
  close() {
    this.dialogRef.close();
  }
}
