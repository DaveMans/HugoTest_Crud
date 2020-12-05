import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  prefix: string = '';
  name: string = '';
  lastname: string = '';
  people: any[] = [
    { name: 'Emil', lastname: 'Hans' },
    { name: 'Max', lastname: 'Mustermann' },
    { name: 'Roman', lastname: 'Tisch' },
  ];
  myControl = new FormControl();
  personIndex: number;
  filteredOptions: Observable<any[]>;

  subscriber() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  ngOnInit() {
    this.subscriber();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.people.filter(
      (person) =>
        person.name.toLowerCase().includes(filterValue) ||
        person.lastname.toLowerCase().includes(filterValue)
    );
  }

  rowClick(index) {
    this.personIndex = index;
    let currentPerson = this.people[index];
    console.log(currentPerson);
    this.name = currentPerson.name;
    this.lastname = currentPerson.lastname;
  }

  createPerson(name: string, lastname: string) {
    let newPerson = { name, lastname };
    this.people.push(newPerson);
    this.clearInputs();
    this.subscriber();
  }

  updatePerson(name: string, lastname: string, index: number) {
    let person = this.people[index];
    person.name = name;
    person.lastname = lastname;
    this.people.splice(index, 1, person);
    this.clearInputs();
    this.subscriber();
  }

  deletePerson(index: number) {
    this.people.splice(index, 1);
    this.clearInputs();
    this.subscriber();
  }

  clearInputs() {
    this.name = '';
    this.lastname = '';
  }
}
