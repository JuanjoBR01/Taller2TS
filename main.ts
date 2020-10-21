import { Course } from "./course.js";

import { dataCourses } from "./dataCourses.js";

import { Student } from "./student.js";

import { dataStudent } from "./dataStudent.js";

let coursesTbody: HTMLElement = document.getElementById("courses")!;
let studentTBody: HTMLElement = document.getElementById("body-student")!;

const btnfilterByName: HTMLElement = document.getElementById(
  "button-filterByName"
)!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("search-box")!
);

const btnFilterByCreds: HTMLElement = document.getElementById(
  "button-filterByCreds"
)!;
const inputMinBox: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("min-creds")!
);
const inputMaxBox: HTMLInputElement = <HTMLInputElement>(
  document.getElementById("max-creds")!
);

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();
btnFilterByCreds.onclick = () => applyFilterByCreds();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm == null
  ? ""
  : (totalCreditElm.innerText += `${getTotalCredits(dataCourses)}`);



function applyFilterByName() {
  let text = inputSearchBox.value;
  text = text == null ? "" : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCreds() {
  
  let minCreds: number; 
  minCreds = (inputMinBox.value=='')?0: <number>(<unknown>inputMinBox.value);
  
  let maxCreds: number; 
  maxCreds = (inputMaxBox.value=='')?100: <number>(<unknown>inputMaxBox.value);

  clearCoursesInTable();

  let coursesFiltered: Course[] = searchCourseByCreds(minCreds,maxCreds,dataCourses);

  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === ""
    ? dataCourses
    : courses.filter((c) => c.name.match(nameKey));
}

function searchCourseByCreds(minCreds: number, maxCreds: number, courses: Course[]) {
    let resp: Course[]=[];
    if (minCreds == 0 && maxCreds==100){
      return dataCourses
    }else{
      courses.forEach(c => {
        if (c.credits>=minCreds && c.credits<=maxCreds){
          resp.push(c);
        }
      });
    }
    return resp;
  
}



function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}


function renderStudentInTable(st: Student): void {
  console.log(`Desplegando al estudiante`);
  let trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Código</td>
                         <td>${st.cod}</td>`;
  studentTBody.appendChild(trElement);

  let trElement1 = document.createElement("tr");
  trElement1.innerHTML = `<td>Cédula</td>
                         <td>${st.ced}</td>`;
  studentTBody.appendChild(trElement1);

  let trElement2 = document.createElement("tr");
  trElement2.innerHTML = `<td>Edad</td>
                          <td>${st.edad} años</td>`;
  studentTBody.appendChild(trElement2);

  let trElement3 = document.createElement("tr");
  trElement3.innerHTML = `<td>Dirección</td>
                          <td>${st.dir}</td>`;
  studentTBody.appendChild(trElement3);

  let trElement4 = document.createElement("tr");
  trElement4.innerHTML = `<td>Teléfono</td>
                          <td>${st.tel}</td>`;
  studentTBody.appendChild(trElement4);
}

function renderCoursesInTable(courses: Course[]): void {
  console.log("Desplegando cursos");
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => (totalCredits = totalCredits + course.credits));
  console.log(totalCredits);
  return totalCredits;
}
