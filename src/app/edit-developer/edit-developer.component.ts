import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DeveloperService } from 'src/app/core/services/developer.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-developer',
  templateUrl: './edit-developer.component.html',
  styleUrls: ['./edit-developer.component.scss']
})
export class EditDeveloperComponent implements OnInit {
  projectId: string|null = '';
  developerId: string|null = '';
  developerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private developerService: DeveloperService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('project-id');
    this.developerId = this.route.snapshot.paramMap.get('id');

    if (this.projectId && this.developerId) {
      this.developerService.getDeveloperBelongToProject(this.projectId, this.developerId).subscribe(
        result => {
          this.developerForm.controls['firstName'].setValue(result.first_name);
          this.developerForm.controls['lastName'].setValue(result.last_name);
        }
      );
    }
  }

  onSubmit() {
    const developer = {
      first_name: this.developerForm.controls['firstName'].value,
      last_name: this.developerForm.controls['lastName'].value
    }

    if(this.projectId && this.developerId) {
      this.developerService.updateDeveloper(this.projectId, this.developerId, developer).subscribe(result => {
        this.router.navigate(['/projects', this.projectId, 'developers']);
      });
    }
  }

  backDeveloperList() {
    this.router.navigate(['/projects', this.projectId, 'developers']);
  }

}
