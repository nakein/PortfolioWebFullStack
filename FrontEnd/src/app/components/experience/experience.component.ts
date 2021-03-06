import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { experience } from 'src/app/model/experience.model';
import { ExperienceService } from 'src/app/service/experience.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experiences:experience[]=[];
  deleteExperience:experience | undefined;
  editExperience:experience | undefined;
  isLogged = false;
  years:string[]=[];
  yearsEnd:string[]=[];
  constructor(public experienceService: ExperienceService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.years = this.generateArrayOfYears(1);
    this.yearsEnd = this.generateArrayOfYears(2);
    this.getExperiences();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  public generateArrayOfYears(id:number):string[]{
    var aux = 0;
    if(id==2) aux = 10;
    var max = new Date().getFullYear() + aux;
    var min = max - 100;
    var yearList = [];
  
    for (var i = max; i >= min; i--) {
      yearList.push(i.toString());
    }

    return yearList;
  }

  public getExperiences():void{
    this.experienceService.getExperience().subscribe({
      next:(Response:experience[]) =>{
        this.experiences=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    });
  }

  public onModalEvent(event:String, experience?:experience):void{
    switch(event){
      case 'edit': 
        this.editExperience=experience;
        break;
      case 'delete': 
        this.deleteExperience=experience;
        break;
    }
  }

  
  public onCreateExperience(addForm: NgForm){
    document.getElementById('create-experience-form')?.click();
    this.experienceService.createExperience(addForm.value).subscribe({
      next:(Response:experience[]) =>{
        console.log(Response);
        this.getExperiences();
        addForm.resetForm();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onEditExperience(experience: experience){
    this.experienceService.editExperience(experience).subscribe({
      next:(Response:experience) =>{
        console.log(Response);
        this.getExperiences();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onDeleteExperience(idEdu: number):void{
    this.experienceService.deleteExperience(idEdu).subscribe({
      next:(Response:void) =>{
        console.log(Response);
        this.getExperiences();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
