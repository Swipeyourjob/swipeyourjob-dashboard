import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services';

@Component({ selector: 'upload', templateUrl: './upload.component.html' })
export class UploadComponent implements OnInit, OnDestroy {
    @Input() id = 'default-upload';
    @Input() fade = true;

    uploadSubscription!: Subscription;
    routeSubscription!: Subscription;
    imgFile!: string;

    uploadForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
        imgSrc: new FormControl('', [Validators.required])
    });

    constructor(private httpClient: HttpClient,private router: Router, private authService: AuthService) { }

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
       reader.readAsDataURL(file);
     
       reader.onload = () => {
         this.imgFile = reader.result as string;
         this.uploadForm.patchValue({
           imgSrc: reader.result
         });
    
       };
     }
   }
    
   upload(){
     console.log(this.uploadForm.value);
     this.httpClient.post('http://localhost:8888/file-upload.php', this.uploadForm.value)
       .subscribe(response => {
         alert('Image has been uploaded.');
       })
   }
 

}