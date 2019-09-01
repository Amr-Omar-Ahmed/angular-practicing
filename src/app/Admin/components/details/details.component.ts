import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { LayoutService } from 'src/app/Shared/Services/layout.service';
import { DataStorageService } from './../../services/data-storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  details: any;
  form: FormGroup;
  maxBodyCharchterLength = 0;
  constructor(private _layoutService: LayoutService,
    private _dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.form = fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      date: ['', Validators.required],
      categoryData: fb.group({
        type: ['', Validators.required],
        avgPrice: ['', Validators.required],
        rate: ['', Validators.required],
      }),
      body: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }



  ngOnInit() {
    this._layoutService.setComponentTitleListener("Details");
    this.route.queryParams.subscribe((data: any) => {
      this.details = this._dataStorageService.getEditedObjDetails(data);
      this.form.setValue({
        title: this.details.title,
        date: this.details.date.toISOString().substring(0, 10),
        categoryData: {
          type: "courses",
          avgPrice: 15,
          rate: "good"
        },
        body: "category desc"
      })

      this.maxBodyCharchterLength = this.body.value.length;
      /* #region  Using PatchValue to update certian formControll */
      //to update certian formControls
      // this.form.patchValue({
      //   title: this.details.title,
      //   date: this.details.date.toISOString().substring(0, 10),
      //   // categoryData: {
      //   //   type: "courses",
      //   //   avgPrice: 15,
      //   //   rate: "good"
      //   // }
      // })
      /* #endregion */
    })
    this.body.valueChanges.subscribe((value: string) => {
      this.maxBodyCharchterLength = value.length;
    })
  }

  /* #region  Getters */
  get title() {
    return this.form.get('title')
  }
  get date() {
    return this.form.get('date')
  }
  get type() {
    return this.form.get('categoryData.type')
  }
  get avgPrice() {
    return this.form.get('categoryData.avgPrice')
  }
  get rate() {
    return this.form.get('categoryData.rate')
  }
  get body() {
    return this.form.get('body')
  }

  /* #endregion */

  checkValidity(formControllName) {
    if (formControllName) {
      return ((formControllName.touched ||
        formControllName.dirty) &&
        formControllName.errors)
    }
  }
  disableFormAction(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.disableFormAction(abstractControl);
      } else {
        console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
        abstractControl.disable()

      }
    });
  }
  disableForm() {
    this.disableFormAction(this.form)
  }
  updateCategory() {
    console.log(this.form.value)
  }

}
