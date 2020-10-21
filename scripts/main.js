import { dataCourses } from "./dataCourses.js";
import { dataStudent } from "./dataStudent.js";
var coursesTbody = document.getElementById("courses");
var studentTBody = document.getElementById("body-student");
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = (document.getElementById("search-box"));
var btnFilterByCreds = document.getElementById("button-filterByCreds");
var inputMinBox = (document.getElementById("min-creds"));
var inputMaxBox = (document.getElementById("max-creds"));
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnFilterByCreds.onclick = function () { return applyFilterByCreds(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm == null
    ? ""
    : (totalCreditElm.innerText += "" + getTotalCredits(dataCourses));
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = text == null ? "" : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCreds() {
    var minCreds;
    minCreds = (inputMinBox.value == '') ? 0 : inputMinBox.value;
    var maxCreds;
    maxCreds = (inputMaxBox.value == '') ? 100 : inputMaxBox.value;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreds(minCreds, maxCreds, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === ""
        ? dataCourses
        : courses.filter(function (c) { return c.name.match(nameKey); });
}
function searchCourseByCreds(minCreds, maxCreds, courses) {
    var resp = [];
    if (minCreds == 0 && maxCreds == 100) {
        return dataCourses;
    }
    else {
        courses.forEach(function (c) {
            if (c.credits >= minCreds && c.credits <= maxCreds) {
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
function renderStudentInTable(st) {
    console.log("Desplegando al estudiante");
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>C\u00F3digo</td>\n                         <td>" + st.cod + "</td>";
    studentTBody.appendChild(trElement);
    var trElement1 = document.createElement("tr");
    trElement1.innerHTML = "<td>C\u00E9dula</td>\n                         <td>" + st.ced + "</td>";
    studentTBody.appendChild(trElement1);
    var trElement2 = document.createElement("tr");
    trElement2.innerHTML = "<td>Edad</td>\n                          <td>" + st.edad + " a\u00F1os</td>";
    studentTBody.appendChild(trElement2);
    var trElement3 = document.createElement("tr");
    trElement3.innerHTML = "<td>Direcci\u00F3n</td>\n                          <td>" + st.dir + "</td>";
    studentTBody.appendChild(trElement3);
    var trElement4 = document.createElement("tr");
    trElement4.innerHTML = "<td>Tel\u00E9fono</td>\n                          <td>" + st.tel + "</td>";
    studentTBody.appendChild(trElement4);
}
function renderCoursesInTable(courses) {
    console.log("Desplegando cursos");
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return (totalCredits = totalCredits + course.credits); });
    console.log(totalCredits);
    return totalCredits;
}
