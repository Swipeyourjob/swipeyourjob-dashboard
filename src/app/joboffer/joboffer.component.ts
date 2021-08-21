import {Title} from '@angular/platform-browser';
import {Component, OnInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import {AlertService, JobService, EstablishmentService} from '@app/services';
import {Job, Establishments, Salary} from '@app/models';
import {Router, ActivatedRoute} from '@angular/router';
import {ImageserviceService} from 'app/_services/imageservice.service';

@Component({
  selector: 'app-verification',
  templateUrl: './joboffer.component.html',
  styleUrls: ['./joboffer.component.css']
})
export class JobofferComponent implements OnInit {
  form: any = {
    jobName: null,
    jobDescription: null,
    jobImage: null,
    // jobStreet: null,
    // jobCity: null,
    availability: [
      {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      },
      {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      },
      {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      },
      {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      },
      {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      },
      {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      },
      {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      }
    ],
    tags: [],
    minimumAgeYesNo: null,
    minimumAge: null,
    wages: {
      age16: null,
      age17: null,
      age18: null,
      age19: null,
      age20: null,
      age21: null
    },
    setPeriodYesNo: null,
    startdate: null,
    enddate: null
  };
  tagField: any;
  dialogChecks: any = {
    passwordDialog: false
  };
  isLoggedIn = false;
  wagesInputEnabled: any = {
    wages16: null,
    wages17: null,
    wages18: null,
    wages19: null,
    wages20: null,
    wages21: null
  };
  setPeriod = false;
  estamblishmentList!: Establishments;
  workplace = '';

  constructor(
    private router: Router,
    private titleService: Title,
    private alertService: AlertService,
    private jobService: JobService,
    private establishmentService: EstablishmentService,
    private imageService: ImageserviceService,
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('SwipeYourJob - Vacature');
    this.establishmentService.getUserEstamblishments().subscribe(
      data => {
        this.estamblishmentList = data;
        // console.log("estamblishmentId: ", this.estamblishmentList[0].id);
      },
      err => {
        console.log(err);
      }
    );
    return;
  }

  onCheck(values: any, age: string): void {
    const value = values.currentTarget.checked;
    switch (age) {
      case 'wages16': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages17': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages18': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages19': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages20': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      case 'wages21': {
        this.wagesInputEnabled.wages16 = value;
        break;
      }
      default: {
        break;
      }
    }
    console.log(values.currentTarget.checked);
    console.log(this.wagesInputEnabled);
  }

  addTag(): void {
    // Runs when the button 'Voeg tag toe' is clicked
    const {tagInput} = this.form;
    if (tagInput !== '' && tagInput !== undefined) {
      this.form.tags.push(tagInput);
      this.updateTags();
      this.form.tagInput = '';
    } else {
      this.alertService.error('Tag kon niet worden toegevoegd, er is niets ingevuld.');
    }
  }

  onImageChange(fileInput: any): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const file: File = fileInput.target.files[0];
      const reader = new FileReader();
      this.imageService.uploadCompanyImg(file).subscribe(
        (data: any) => {
          console.log(data);
          this.workplace = data.url;
        },
        (err: any) => {
          // console.log(err);
        }
      );
    }
  }

  updateTags(): void {
    // Updates the visible list of all the tags so it matches the array with all the tags
    const tagsHtml: any[] = [];
    const htmlTagList: any = document.getElementById('selected-tag-list');
    // tslint:disable-next-line:only-arrow-functions
    htmlTagList.innerHTML = '';
    this.form.tags.forEach((value: any) => {
      this.addSingleTag(value);
    });
  }

  addSingleTag(value: any): any {
    // Add the html element for a single tag
    const tagElement = document.createElement('div');
    tagElement.textContent = value;

    const button = document.createElement('button');
    button.className = 'btn btn-primary btn-small';
    button.textContent = 'x';

    tagElement.appendChild(button);
    const selectedTagList: HTMLElement | null = document.getElementById('selected-tag-list');
    if (selectedTagList) {
      selectedTagList.appendChild(tagElement);
    } else {
      console.log('Error generated by programmer: Cannot find element with ID \'selected-tag-list\'');
    }

    button.setAttribute('data-tagvalue', value);

    button.addEventListener('click', (event) => {
      const key = this.form.tags.find((element: any) => element === value);
      const index = this.form.tags.indexOf(key, 0);
      if (index > -1) {
        this.form.tags.splice(index, 1);
      }
      console.log(value);
      this.updateTags();
      console.log(this.form.tags);
    });
  }

  onSetPeriod(value: any): void {
    this.setPeriod = value;
    console.log('switch date picker visibility');
    console.log(value);
  }

  // validateInput(element: HTMLInputElement): boolean {
  //   console.log(element);
  //   console.log(element.getAttribute('data-mandatory2'));
  //   if (
  //     element.getAttribute('data-mandatory') != null &&
  //     element.getAttribute('data-error-mandatory') != null &&
  //     element.getAttribute('data-mandatory') == 'true' &&
  //     element.value == '') {
  //     console.log(element.getAttribute('data-error-mandatory'));
  //
  //     this.alertService.error(String(element.getAttribute('data-error-mandatory')), {fade: true});
  //
  //     return false;
  //   }
  //   return true;
  // }

  onSubmit(): void {
    console.log('Submit form');
    this.alertService.clear(); // clear all alerts
    // check all inputs
    if (!this.validateInput()) {
      this.alertService.error('Het formulier bevat fouten en is niet verzonden.', {fade: false});
      return;
    }

    this.form.jobImage = this.workplace;
    const jobToCreate = this.convertFormtoJob(this.form);
    // send job to server
    this.jobService.createJob(jobToCreate).subscribe(
      data => {
        if (data.hasOwnProperty('ok')) {
          if ((data as any).ok) {
            this.alertService.info('De vacature is aangemaakt.', {fade: true});
            this.router.navigate(['/my-vacancies']);
          }
        }
      },
      err => {
        console.log(err);
        this.alertService.error('Het formulier kon niet worden verzonden door een error op de server.', {fade: false});
      }
    );
  }

  converWagestoarray(wages: object): Array<Salary> {
    const salary = new Array();
    let counter = 15;
    for (const [key, value] of Object.entries(wages)) {
      console.log(`${key}: ${value}`);
      if (value) {
        salary.push({age: counter + 1, salary: value});

      }
      counter++;
    }
    return salary;
  }

  convertFormtoJob(formulier: any): Job {
    const salary = this.converWagestoarray(this.form.wages);

    return {
      estamblishmentid: this.estamblishmentList[0].id,
      jobName: formulier.jobName,
      jobDescription: formulier.jobDescription,
      jobImage: formulier.jobImage,
      startdate: formulier.startdate,
      enddate: formulier.enddate,
      avaibility: formulier.availability,
      tags: formulier.tags,
      salary
    };
  }

  validateInput(): boolean {
    let formComplete = true;
    if (this.form.jobName === '' || this.form.jobName == null) {
      this.alertService.error('Het is verplicht om de naam van de functie in te vullen.');
      formComplete = false;
    }
    if (this.form.jobDescription === '' || this.form.jobDescription == null) {
      this.alertService.error('Het is verplicht om een functieomschrijving in te vullen.');
      formComplete = false;
    }
    let availabilityComplete = false;
    for (const row of this.form.availability) {
      // for (let i = 0; i < this.form.availability.length; i++) {
      const day: { [index: string]: any } = row;
      for (const key in day) {
        if (day[key]) {
          availabilityComplete = true;
        }
      }
    }
    if (!availabilityComplete) {
      this.alertService.error('Het is verplicht om minstens één werktijd te specificeren.');
      formComplete = false;
    }
    if (this.form.tags.length < 1) {
      this.alertService.error('Het is verplicht om minstens één tag te selecteren.');
      formComplete = false;
    }
    if (
      this.form.minimumAgeYesNo == null ||
      this.form.minimumAgeYesNo === ''
    ) {
      this.alertService.error('Er is niet aangegeven of er een minimum leeftijd voor deze vacature is.');
      formComplete = false;
    }
    if (
      (
        this.form.minimumAge == null ||
        this.form.minimumAge === ''
      ) &&
      this.form.minimumAgeYesNo === 'yes'
    ) {
      this.alertService.error('De minimum leeftijd van de vacature is niet ingevuld, terwijl er wel een minimum leeftijd is.');
      formComplete = false;
    }

    const wageIsNotEmpty = !Object.values(this.form.wages).some(x => (x !== null));
    if (wageIsNotEmpty) {
      this.alertService.error('Het is verplicht om minimaal één uurloon in te vullen.');
      formComplete = false;
    }
    if (
      this.form.setPeriodYesNo == null ||
      this.form.setPeriodYesNo === ''
    ) {
      this.alertService.error('Er is niet aangegeven of deze vacature voor een bepaalde tijd is.');
      formComplete = false;
    }
    if (
      (
        this.form.startdate == null ||
        this.form.startdate === ''
      ) &&
      this.form.setPeriodYesNo === 'yes'
    ) {
      this.alertService.error('Er is geen startdatum van de vacature ingevuld.');
      formComplete = false;
    }
    if (this.form.enddate && this.form.startdate) {
      const startDate = Date.parse(this.form.startdate);
      const endDate = Date.parse(this.form.enddate);
      console.log(startDate);
      console.log(endDate);

      if (startDate > endDate) {
        this.alertService.error('De einddatum van de vacature ligt voor de startdatum.');
        formComplete = false;
      }
    } else if (this.form.enddate && !this.form.startdate) {
      formComplete = false;
    } else if (this.form.startdate && !this.form.enddate) {
      this.form.enddate = '';
      console.log('yes start no end');
    }
    return formComplete;
  }
}
