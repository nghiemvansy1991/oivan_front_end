import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service'
import { IProjectRequest } from 'src/app/core/interfaces/project-request'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {
  projectList: any
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'action'];

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects() {
    this.projectService.getAllProjects()
      .subscribe((data: IProjectRequest) => this.projectList = data);
  }

  openDialog(projectId: string): void {
    const dialogRef = this.dialog.open(RemoveProjectDialog, {
      width: '250px',
      data: { id: projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.projectService.deleteProject(result).subscribe(
          res => window.location.reload()
        );
      }
    });
  }
}

@Component({
  selector: 'remove-project-dialog',
  templateUrl: 'remove-project-dialog.html',
})

export class RemoveProjectDialog {
  constructor(
    public dialogRef: MatDialogRef<RemoveProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
