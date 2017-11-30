import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {PatientInterface} from "../dataInterfaces/patient";
import {Http} from "@angular/http";

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css'],
  /*encapsulation: ViewEncapsulation.None*/
})
export class InfirmierComponent implements OnInit {

    patientsNonAffecte: PatientInterface[] = [];
    infirmiers: InfirmierInterface[] = [];

    //@Output()
    //selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();

    constructor(private cabinetService: CabinetMedicalService, private http: Http ) {
        this.fetchData();

    }

    fetchData(){
        this.cabinetService.getData( '/data/cabinetInfirmier.xml' ).then(data => {
            //this.patientsNonAffecte = data.patientsNonAffectés;
            this.infirmiers = data.infirmiers;

            console.log(this.infirmiers)
        });
    }

    ngOnInit() {
    }




}
