import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TechnologyService } from 'src/app/core/services/technology.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-technology',
  templateUrl: './create-technology.component.html',
  styleUrls: ['./create-technology.component.scss']
})
export class CreateTechnologyComponent implements OnInit {
  technologyId: string|null = '';
  technologyForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private technologyService: TechnologyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.technologyId = this.route.snapshot.paramMap.get('id');

    if (this.technologyId) {
      this.technologyService.getTechnologyById(this.technologyId).subscribe(
        result => {
          this.technologyForm.controls['name'].setValue(result.name);
        }
      );
    }
  }

  onSubmit() {
    const technlogy = {
      name: this.technologyForm.controls['name'].value
    }


    if(this.technologyId) {
      this.technologyService.updateTechnology(this.technologyId, technlogy).subscribe(result => {
        this.router.navigate(['/technologies']);
      });
    } else {
      this.technologyService.createTechnology(technlogy).subscribe(result => {
        this.router.navigate(['/technologies']);
      });
    }
  }

  backTechnologyList() {
    this.router.navigate(['/technologies']);
  }
}
