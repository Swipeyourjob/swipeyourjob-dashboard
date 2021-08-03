import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { EstablishmentService, AlertService } from '@app/services';
import {ImgResponse} from '@app/models';

@Component({ selector: 'upload-plus-preview', templateUrl: './upload.component.html', styleUrls: ['./upload.component.css'] })
export class UploadComponent implements OnInit, OnDestroy {
    uploadSubscription!: Subscription;
    routeSubscription!: Subscription;
    responseData!: Object;
    imgPreview!: string;
    imgFile = new FormData();

    uploadForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
        imageFile: new FormControl('', [Validators.required])
    });

    constructor(private httpClient: HttpClient,private router: Router, private establishmentService: EstablishmentService, private alertService: AlertService) { }

    ngOnInit() {
           
    }

    ngOnDestroy() {
        
    }
   
     
   get uf(){
     return this.uploadForm.controls;
   }
    
    onImageChange(e: any) {
        const reader = new FileReader();
        if(e.target.files && e.target.files.length) {
            const [file] = e.target.files;

            this.imgFile.append("imageFile", file, file.name);
            reader.readAsDataURL(file);
    
            reader.onload = () => {
                this.imgPreview = reader.result as string;
                this.uploadForm.patchValue({
                    imageFile: reader.result
                });
            }
        }
    }
    
    upload(){
        if(this.imgFile.has("imageFile")){
            console.log(this.uploadForm.get('imageFile'));
            console.log(this.imgFile);
            /*
            
            this.establishmentService.uploadCompanyImg(this.imgFile).subscribe(
                complete => {
                    console.log("succ: ",complete);
                    this.responseData = complete;
                    this.alertService.success('WERKT', { keepAfterRouteChange: true });
                },
                err => {
                    console.log("ERR: ",err);
                    this.alertService.error("WERKT NIE")
                }
            );
            */

            
        }
        
        
    }
 

}