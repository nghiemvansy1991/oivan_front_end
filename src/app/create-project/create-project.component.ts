import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/core/services/project.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectId: string|null = '';

  projectForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    endDate: new FormControl(''),
  });

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');

    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(
        result => {
          this.projectForm.controls['name'].setValue(result.name);
          this.projectForm.controls['description'].setValue(result.description);
          this.projectForm.controls['endDate'].setValue(result.end_date);
        }
      );
    }
  }

  onSubmit() {
    const project = {
      name: this.projectForm.controls['name'].value,
      description: this.projectForm.controls['description'].value,
      end_date: this.projectForm.controls['endDate'].value
    }


    if(this.projectId) {
      this.projectService.updateProject(this.projectId, project).subscribe(result => {
        this.router.navigate(['/projects']);
      });
    } else {
      this.projectService.createProject(project).subscribe(result => {
        this.router.navigate(['/projects']);
      });
    }
  }

  backProjectList() {
    this.router.navigate(['/projects']);
  }
}
