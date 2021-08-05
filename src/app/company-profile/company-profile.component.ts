import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { TokenStorageService,EstablishmentService } from '@app/services';
import {ZipcodeValidator} from '@app/helpers';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import {faInstagram,faFacebook,faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faCheck, faTimes, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { ImageserviceService } from 'app/_services/imageservice.service';
import { CompanyProfile } from '@app/models';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {

 
    form: CompanyProfile = {
        establishmentid: 0,
        introduction: "",
        logo: "",
        ownerFirstName: "",
        ownerLastname: "",
        ownerPicture: "",
        weburl: "",
        facebookUrl: "",
        instagramUrl: "",
        linkedinUrl:"",
        place: "",
        streetname: "",
        housenumber: "",
        zipcode: ""
    };
    public companyLogo: any;
    public profilePicture: any;
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
        private zipcodeValidator: ZipcodeValidator,
        private imageService: ImageserviceService
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

                        console.log(estaid);
                        this.form.establishmentid = estaid;
                        //this.loadEstamblishment(estaid);
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
        
    }
    public zipcodechange():void {
        let zipcode = this.form.zipcode;

        this.dialogChecks.zipcodeNameDialog = true
        this.zipcodecheck.invalidCheck = this.zipcodeValidator.checkRegex(zipcode);
        this.zipcodecheck.lengthCheck = this.zipcodeValidator.checkLength(zipcode);
    }
    public onSubmit(f: NgForm): void {
        this.form.logo = this.companyLogo;
        this.form.ownerPicture  = this.profilePicture;
        this.establishmentService.updateCompanyProfile(this.form).subscribe(
            (data) => {
                console.log(data);
            }
        );
        
    }
    onImageChange(fileInput : any,uploadtype : string ) {
        
        if (fileInput.target.files && fileInput.target.files[0]) {
            const file: File = fileInput.target.files[0];
            const reader = new FileReader();    
            this.imageService.uploadCompanyImg(file).subscribe(
                (data: any) => {
                    if(uploadtype == 'companylogo'){
                        this.companyLogo = data.url;
                    }else{
                        this.profilePicture = data.url;
                    }
                   
                },
                (err: any) => {
                    //console.log(err);
                }
                );
        }
      }
    public loadEstamblishment(id: number){
        try{
            if (id){
                this.establishmentService.getEstamblishmentByID(id).subscribe(
                    (data: any) => {
                        console.log(data);
                        
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
       /* if (this.form.CompanyIntroduction != null) {
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
        }*/
    }

    
}
