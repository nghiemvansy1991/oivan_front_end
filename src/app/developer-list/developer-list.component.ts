import { Component, OnInit, Inject } from '@angular/core';
import { DeveloperService } from 'src/app/core/services/developer.service'
import { IDeveloperRequest } from 'src/app/core/interfaces/developer-request'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.scss']
})
export class DeveloperListComponent implements OnInit {
  developerList: any = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'action'];
  projectId: string|null = null;

  constructor(
    private developerService: DeveloperService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('project-id');
    if(this.projectId) {
      this.getAllDevelopers(this.projectId)
    }
  }

  getAllDevelopers(projectId: string) {
    this.developerService.getDeveloperListBelongToProject(projectId)
      .subscribe((data: IDeveloperRequest) => this.developerList = data);
  }

  openDialog(developerId: string): void {
    const dialogRef = this.dialog.open(RemoveDeveloperDialog, {
      width: '250px',
      data: { projectId: this.projectId, id: developerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && this.projectId) {
        this.developerService.deleteDeveloper(this.projectId, result).subscribe(
          res => window.location.reload()
        );
      }
    });
  }


}

@Component({
  selector: 'remove-developer-dialog',
  templateUrl: 'remove-developer-dialog.html',
})

export class RemoveDeveloperDialog {
  constructor(
    public dialogRef: MatDialogRef<RemoveDeveloperDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
