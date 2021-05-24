import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { TokenStorageService,EstablishmentService } from '@app/services';
import {Establishment} from '@app/models'
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import {faInstagram,faFacebook,faLinkedin} from '@fortawesome/free-brands-svg-icons';


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
    public icons: any = {
        faInstagram: faInstagram,
        faFacebook: faFacebook,
        faLinkedin: faLinkedin,
    };
    public wordcount = 0;
    public Editor = InlineEditor;

    public constructor(
        private tokenStorage: TokenStorageService,
        private establishmentService: EstablishmentService,
        private titleService: Title
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
        let userinfo = this.tokenStorage.getUserinfo();
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
    public onSubmit(f: NgForm): void {
        
        console.log(f);
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
