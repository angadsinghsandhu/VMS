import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GuardService } from 'src/app/services/guard.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  constructor(private guardService: GuardService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  // variables
  entryUpdate = this.fb.group({
    emp_id: [''],
    entry_num: [''],
    accompany: ['', Validators.required],
    pass_id: ['', Validators.required],
    entry_time: [{ hour: 8, minute: 0 }, Validators.required],
    image: ['', Validators.required],
    remarks: ['']
  })

  submitted: boolean = false;
  errMsg: string = null;
  message: string = null;

  // form functions
  get accompany() { return this.entryUpdate.get('accompany'); }
  get pass_id() { return this.entryUpdate.get('pass_id'); }
  get entry_time() { return this.entryUpdate.get('entry_time'); }

  ngOnInit(): void {

    // accompany, pass_id
    this.entryUpdate.controls['emp_id'].setValue(parseInt(this.route.snapshot.paramMap.get("emp_id")));
    this.entryUpdate.controls['entry_num'].setValue(parseInt(this.route.snapshot.paramMap.get("entry_num")));

    this.submitted = false
  }

  onFileSelect(event) {
    const formData = new FormData();
    formData.append('file', <File>event.target.files[0])

    const emp_id = this.entryUpdate.controls['emp_id'].value
    const entry_num = this.entryUpdate.controls['entry_num'].value

    this.guardService.createImage(formData, emp_id, entry_num)
      .subscribe(data => {
        console.log("sucess in adding image")
      }, err => {
        console.error(`error occored in image upload : ${err}`)
      })

    const MIME_TYPE_MAP = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg'
    }

    const ext = MIME_TYPE_MAP[event.target.files[0].type];
    const path = this.guardService.getImagePath(`${emp_id}-${entry_num}.${ext}`)

    const time = new Date().getTime()

    this.entryUpdate.controls['image'].setValue(path + '?' + time);
  }

  onSubmit() {

    this.submitted = true;

    // changing the "entry_time" attribute to a string
    var time = this.entryUpdate.controls['entry_time'].value;
    var hour = (time.hour).toString().padStart(2, "0");
    var min = (time.hour).toString().padStart(2, "0");
    this.entryUpdate.controls['entry_time'].setValue(`${hour}-${min}`)

    // clearing space
    time = hour = min = null;;

    // updatingting entry
    this.guardService.onEntry(this.entryUpdate.value)
      .subscribe(data => {
        this.message = "Updation Sucessful";
      }, err => {
        this.errMsg = err.statusText;
      });
  }

  reset() {
    window.location.reload();
  }

  goBack() {
    this.router.navigate(['guardDash']);
  }

}
