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
          if(confirm("Etes vous sure de vouloir affecte")){
              this.http.post( "/affectation", {
                  infirmier: this.willAffectId.split("-")[0],
                  patient: this.willAffectId.split("-")[1]
              })
                  .toPromise()
                  .then(data => {
                      this.fetchData();
                  })
                  .catch(error => {
                      alert("Erreur lors de la l'affectation");
                  })
          }
      }

    }

}
