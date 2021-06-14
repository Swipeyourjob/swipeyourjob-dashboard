import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { EstablishmentService } from '@app/services';
import {ImgResponse} from '@app/models';

@Component({ selector: 'upload-plus-preview', templateUrl: './upload.component.html', styleUrls: ['./upload.component.css'] })
export class UploadComponent implements OnInit, OnDestroy {
    uploadSubscription!: Subscription;
    routeSubscription!: Subscription;
    responseData!: Object;
    imgPreview!: string;
    imgFile= new FormData();

    uploadForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
        imgSrc: new FormControl('', [Validators.required])
    });

    constructor(private httpClient: HttpClient,private router: Router, private establishmentService: EstablishmentService) { }

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
            this.imgFile.append("imageFile", file);
            reader.readAsDataURL(file);
    
            reader.onload = () => {
                this.imgPreview = reader.result as string;
                this.uploadForm.patchValue({
                    imgSrc: reader.result
                });
            }
        }
    }
    
    upload(){
        if(this.imgFile.has("imageFile")){
            console.log(this.uploadForm.value);
            console.log(this.imgFile.get("imageFile"));

            
            this.establishmentService.uploadCompanyImg(this.imgFile.get("imageFile")).subscribe(
                data => {
                    console.log("succ");
                    console.log(data);
                    this.responseData = data;
                },
                err => {
                    console.log("ERR",err);
                }
            );
        }
        
        
    }
 

}