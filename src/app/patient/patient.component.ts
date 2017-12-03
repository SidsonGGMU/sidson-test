import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {PatientInterface} from "../dataInterfaces/patient";
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {MatSelectChange} from "@angular/material";
import {Http} from "@angular/http";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent implements OnInit {

  patientsNonAffecte: PatientInterface[] = [];
  infirmiers: InfirmierInterface[] = [];
    willAffectId:string = "none";

    //@Output()
    //selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();

  constructor(private cabinetService: CabinetMedicalService, private http: Http ) {
      this.fetchData();

  }

  fetchData(){
      this.cabinetService.getData( '/data/cabinetInfirmier.xml' ).then(data => {
          this.patientsNonAffecte = data.patientsNonAffectés;
          this.infirmiers = data.infirmiers;

          console.log(this.patientsNonAffecte)
      });
  }

  ngOnInit() {
  }


    affChanged(event){
      if(this.willAffectId !== "none"){

          window['swal']({
              text: 'Etes vous sure de vouloir affecte',
              title:"Ete vous sure?",
              type: "warning",
              showCancelButton: true,
              closeOnConfirm: true
          },  (bool) => {
              if(bool){
                  this.http.post( "/affectation", {
                      infirmier: this.willAffectId.split("-")[0],
                      patient: this.willAffectId.split("-")[1]
                  })
                      .toPromise()
                      .then(data => {
                          setTimeout(() => {
                              window['swal']({
                                  text: 'Patient afecté avec success',
                                  title:"Succès",
                                  type: "success",
                                  showCancelButton: false,
                                  closeOnConfirm: true
                              }, () => {
                                  this.fetchData();
                              });

                          }, 200)
                      })
                      .catch(error => {
                          window['swal']({
                              text: "Erreur lors de la l'affectation",
                              title:"Erreur",
                              type: "error",
                          });
                      })
              }
              else{
                  this.willAffectId = "none";
              }
          });



      }

    }

}
