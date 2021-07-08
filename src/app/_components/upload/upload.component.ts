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
        imageFile: new FormControl('', [Validators.required]),
        imgBody: new FormControl('', [Validators.required])
    });

    constructor(private httpClient: HttpClient,private router: Router, private establishmentService: EstablishmentService, private alertService: AlertService) { }

    ngOnInit() {
           
    }

    ngOnDestroy() {
        
    }
    uploadImage(e: any){
        
        const [file] = e.target.files;
    }
     
   get uf(){
     return this.uploadForm.controls;
   }
    
    onImageChange(e: any) {
        const reader = new FileReader();
        if(e.target.files && e.target.files.length) {
            const [file] = e.target.files;
            console.log(e.target);
            console.log(file);
            console.log(file.name);
            this.imgFile.append("imageFile", file, file.name);
            console.log(this.uploadForm.get('file'));
            reader.readAsDataURL(file);
    
            reader.onload = () => {
                this.imgPreview = reader.result as string;
                this.uploadForm.patchValue({
                    imageFile: file,
                });
            }
        }
    }
    
    upload(){
        if(this.imgFile.has("imageFile")){
            console.log(this.uploadForm.get('imageFile'));
            console.log(this.imgFile);
            console.log(this.uploadForm.value.imageFile);
            console.log(this.imgFile);
            
            
            this.establishmentService.uploadCompanyImg(this.uploadForm.value.imageFile).subscribe(
                data => {
                    console.log("succ: ",data);
                    this.responseData = data;
                    this.alertService.success('WERKT', { keepAfterRouteChange: true });
                },
                err => {
                    console.log("ERR: ",err);
                    this.alertService.error("WERKT NIE")
                }
            );
        }
        
        
    }
 

}