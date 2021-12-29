import { Component, OnInit, Inject } from '@angular/core';
import { TechnologyService } from 'src/app/core/services/technology.service'
import { ITechnologyRequest } from 'src/app/core/interfaces/technology-request'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent implements OnInit {
  technologyList: any
  displayedColumns: string[] = ['name', 'action'];
  projectId: string|null = '';

  constructor(
    private technlogyService: TechnologyService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');

    if(this.projectId) {
      this.getTechnologyByProjectId(this.projectId);
    } else {
      this.getAllTechnologies()
    }
  }

  getAllTechnologies() {
    this.technlogyService.getAllTechnologies()
      .subscribe((data: ITechnologyRequest) => this.technologyList = data);
  }

  getTechnologyByProjectId(projectId: string) {
    this.technlogyService.getTechnologyByProjectId(projectId)
      .subscribe((data: ITechnologyRequest) => this.technologyList = data);
  }

  openDialog(technologyId: string): void {
    const dialogRef = this.dialog.open(RemoveTechnologyDialog, {
      width: '250px',
      data: { id: technologyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.technlogyService.deleteTechnology(result).subscribe(
          res => window.location.reload()
        );
      }
    });
  }
}

@Component({
  selector: 'remove-technology-dialog',
  templateUrl: 'remove-technology-dialog.html',
})

export class RemoveTechnologyDialog {
  constructor(
    public dialogRef: MatDialogRef<RemoveTechnologyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
