import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EstablishmentService } from 'app/_services/establishment.service';

import { TokenStorageService} from '../_services';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  public Editor = ClassicEditor;
  form: any = {
    CompanyIntroduction: null,
    Companylogo: null,
    Firstname: null,
    Lastname:null,
    profileUrl: null,
    facebooklink: null,
    instagramlink: null,
    linkedinlink: null,
    Place: null,
    Streetname: null,
    housenumber: null,
    zipcode: null
  };

  wordcount = 0;
  constructor(private tokenStorage: TokenStorageService,private establishment : EstablishmentService) { }




  ngOnInit(): void {
    this.establishment.getUserEstamblishments().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
    let userinfo = this.tokenStorage.getUserinfo();
    if(userinfo != null){
      console.log(userinfo);
      this.form.Firstname = (userinfo['firstname'] != null && userinfo['firstname'] != '') ? userinfo['firstname'] :null;
      this.form.Lastname = (userinfo['lastname'] != null && userinfo['lastname'] != '') ? userinfo['lastname'] :null;
    }
  }
  onSubmit(): void{
      
  }


  companydescriptionChanged(event: KeyboardEvent): void {
    console.log(event);
    if (this.form.CompanyIntroduction != null) {
      // regex to remove all the html tag
      var regex = /(<([^>]+)>)/ig
      const wordcounter = this.form.CompanyIntroduction.replace(regex, "").replace(" ", "");
      if (wordcounter.length + 1 >= 251) {
        event.preventDefault();
      } else {
        this.wordcount = wordcounter.length + 1;
      }
    } else {
      this.wordcount = 1;
    }


  }

}
