import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { TokenStorageService,EstablishmentService } from '@app/services';
import {ZipcodeValidator} from '@app/helpers';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import {faInstagram,faFacebook,faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faCheck, faTimes, faToggleOff } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {

    public form: any = {
        CompanyIntroduction: null,
        Companylogo: null,
        Firstname: null,
        Lastname: null,
        profileUrl: null,
        CompanyUrl: null,
        facebooklink: null,
        instagramlink: null,
        linkedinlink: null,
        Place: null,
        Streetname: null,
        housenumber: null,
        zipcode: null,
    };
    public imgFile: any;
    public icons: any = {
        faInstagram: faInstagram,
        faFacebook: faFacebook,
        faLinkedin: faLinkedin,
        faCheck: faCheck,
        faTimes: faTimes
    };
    public wordcount = 0;
    public Editor = InlineEditor;
    public zipcodecheck: any = {
        invalidCheck: false,
        lengthCheck: false
    };
    public dialogChecks: any = {
        companyNamedialog: false,
        zipcodeNameDialog: false,
        emailNameDialog: false,
        passwordDialog: false,
        passwordRepeatDialog: false,
        kvkdDialog: false
    };

    public constructor(
        private tokenStorage: TokenStorageService,
        private establishmentService: EstablishmentService,
        private titleService: Title,
        private zipcodeValidator: ZipcodeValidator
    ) { }

    public ngOnInit(): void {
        this.titleService.setTitle('SwipeYourJob - Bedrijfsprofiel aanmaken');
        
        this.establishmentService.getUserEstamblishments().subscribe(
            (data: any) => {
                let establishment = {... data};
                let establishmentlen = Object.keys(establishment).length;
                if(establishmentlen > 0){
                    if(establishmentlen == 1){
                        let estaid = (establishment[0].hasOwnProperty('id')) ? establishment[0].id:false;
                        this.loadEstamblishment(estaid);
                    }else{
                        // let html = '';
                        // establishment.forEach(element, val => {
                        //     html += `<option value="${val.id}">${val.name}</option>`                            
                        // });
                    }
                }else{
                    console.log("nope isn't there ");
                }
            },
            (err: any) => {
                console.log(err);
            }
        )
        let userinfo = this.tokenStorage.getUserInfo();
        if (userinfo != null) {
            this.form.Firstname =
                userinfo['firstname'] != null && userinfo['firstname'] != ''
                    ? userinfo['firstname']
                    : null;
            this.form.Lastname =
                userinfo['lastname'] != null && userinfo['lastname'] != ''
                    ? userinfo['lastname']
                    : null;
        }
    }
    public zipcodechange():void {
        let zipcode = this.form.zipcode;

        this.dialogChecks.zipcodeNameDialog = true
        this.zipcodecheck.invalidCheck = this.zipcodeValidator.checkRegex(zipcode);
        this.zipcodecheck.lengthCheck = this.zipcodeValidator.checkLength(zipcode);
    }
    public onSubmit(f: NgForm): void {
        
        console.log(f);
    }
    onImageChange() {

      }
    public loadEstamblishment(id: number){
        try{
            if (id){
                this.establishmentService.getEstamblishmentByID(id).subscribe(
                    (data: any) => {
                        console.log(data);
                        this.form = data;
                    },
                    (err: any) => {
                        console.log(err);
                    }
                );
            }
            
        } catch(error){
            return false;
        }
        return false;
    }
    public companydescriptionChanged(event: KeyboardEvent): void {
        console.log(event);
        if (this.form.CompanyIntroduction != null) {
            // regex to remove all the html tag
            var regex = /(<([^>]+)>)/gi;
            const wordcounter = this.form.CompanyIntroduction.replace(
                regex,
                ''
            ).replace(' ', '');
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
