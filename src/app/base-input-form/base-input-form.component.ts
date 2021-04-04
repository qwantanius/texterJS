import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';


@Component({
  selector: 'app-base-input-form',
  templateUrl: './base-input-form.component.html',
  styleUrls: ['./base-input-form.component.css']
})



export class BaseInputFormComponent implements OnInit {

  textFromBaseForm: string;
  baseSeparator: string;
  formWarningMsg: string;
  resultOfSearch: string[] = [];
  symbolToSearch: string;
  formTitleForText: string;
  formTitleForSymbols: string;

  constructor() { 
    this.baseSeparator = "";
    this.textFromBaseForm = "";
    this.symbolToSearch = "";
    this.formTitleForSymbols = "Enter symbols to search in:";
    this.formTitleForText = "Enter text to analyse:";
    this.formWarningMsg = "*Form shouldnt be empty";
    setInterval(()=>{ this.validator() },100);
  }

  validator(){
    this.formWarningMsg = (this.textFromBaseForm.length < 1 && this.symbolToSearch.length < 1) ? "*Forms shouldnt be empty" :
      (this.textFromBaseForm.length < 1 && this.symbolToSearch.length >= 1) ? "*Form with base text shouldnt be empty" :
      (this.symbolToSearch.length < 1 && this.textFromBaseForm.length >= 1) ? "*Form with symbol to search shouldnt be empty":"*To search press button Search";
  }

  searchThisSymbol(sym:string){
    this.resultOfSearch = [];
    this.textFromBaseForm.split(this.baseSeparator).forEach((value) => {
      this.symbolToSearch.indexOf(value) >=0 ? this.resultOfSearch.push(value) : "";
    });
    return this.resultOfSearch;
  }

  ngOnInit(): void {
    console.log("base widget for input inited");
  }


  buttonSearchClicked(): void{
    this.searchThisSymbol(this.symbolToSearch);
  }



  buttonClearClicked(): void{
    this.symbolToSearch = "";
    this.textFromBaseForm = "";
    this.searchThisSymbol("");
  }

  _checkProtocolHTTPorHTTPS(inputString:string):string{
    let resultProtocol:string = "";
    if(this.textFromBaseForm.match(/http:\/\//)){
      console.log(this.textFromBaseForm.match(/http:\/\//));
      resultProtocol = "HTTP";
    }
    if(this.textFromBaseForm.match(/https:\/\//)){
      resultProtocol = "HTTPS";
    } 
    if(this.textFromBaseForm.match(/http:\/\//) && this.textFromBaseForm.match(/https:\/\//)){
      resultProtocol = "HTTP,HTTPS";
    }
    return resultProtocol;
  }


  buttonGetAllProtocols(){
    if(this._checkProtocolHTTPorHTTPS(this.textFromBaseForm)){
      this.resultOfSearch = [];
      this.resultOfSearch.push(this._checkProtocolHTTPorHTTPS(this.textFromBaseForm));
    } 
  } 


  isThisStringShouldBeIgnored(str:string){
    return String(Object(this.textFromBaseForm.match(/\{(.*)\}/))["1"]) == str;
  }

  buttonDeleteDublicatesClicked(){
    this.resultOfSearch = [...new Set(this.resultOfSearch)];
    return this.resultOfSearch;
  }

  getIgnoredSymbols(){
    let stringRegExpDump:string = String(Object(this.textFromBaseForm.match(/\{(.*)\}/))["1"]);
    return  (stringRegExpDump === "undefined") ? "IGNORE SYNTAX \`\{\}\` DONT FINDED":
            (stringRegExpDump == "") ? "SYMBOLS TO IGNORE DIDNT FINDED":
             stringRegExpDump;
    
  }

  buttonGetAllIgnoredSymbolsClicked(){
    this.resultOfSearch = [];
    this.resultOfSearch.push(this.getIgnoredSymbols());
  }


  deleteSymbolFromFormByIndex(index:number) {
    return this.textFromBaseForm.split(this.baseSeparator).splice(index,1);
  }

  getAllIndexesOfIgnoredSymbols(){
    function deleteThisSymbol(){}
    let flagIgnore:boolean = false;
    let indexesToDelete: number[] = [];
    this.textFromBaseForm.split(this.baseSeparator).forEach((value,index,arr) => {
      if(value == "{" || flagIgnore){
        indexesToDelete.push(index);
        flagIgnore = true;
      }
      if (value == "}" || !flagIgnore){
        flagIgnore = false;
      }
    });
    return indexesToDelete;
  }


  elementInArray(element:any,arr:any[]){
    arr.forEach((value) => {
      if(value == element){
        return true;
      } else {
        return false;
      }
    });
  }


  buttonSearchWithoutIgnoredSymbolsClicked(){
    let resultToRewriteIgnore: any[] = [];
    for(let indexForGlobalSursor:number=0; indexForGlobalSursor < this.textFromBaseForm.split(this.baseSeparator).length; indexForGlobalSursor++){
      let cursorIndex:number = indexForGlobalSursor;
      let cursorValue:string = String(this.textFromBaseForm.split(this.baseSeparator)[indexForGlobalSursor]);
      let specialSymCounter:number = 0;
      this.getAllIndexesOfIgnoredSymbols().forEach((value) => {
        if(!(cursorIndex == value)){
          specialSymCounter++;
        }
      });
      if(specialSymCounter == this.getAllIndexesOfIgnoredSymbols().length){
        resultToRewriteIgnore.push(cursorValue);
      }
      this.resultOfSearch = [];
      resultToRewriteIgnore.forEach((value,index,arr) => {
        this.symbolToSearch.indexOf(value) >=0 ? this.resultOfSearch.push(value) : "";
      });
      
    }

  }


  onSelect(): void {}

  onSubmit(): void {}

}
