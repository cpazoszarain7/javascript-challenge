// from data.js
var tableData = data;

// Select the button
var button = d3.select('#filter-btn')

//Select the form
var form = d3.select('#form')

//Select the table
var table = d3.select('#ufo-table')

//Select table body
var tbody = d3.select('tbody')

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

// Prevent the page from refreshing
d3.event.preventDefault();

// Select the input element and get the raw HTML node
var inputElement = d3.select("#datetime");

// Get the value property of the input element
var inputValue = inputElement.property("value");

//Filter data based on selected date
var filteredData = tableData.filter(item => item.datetime === inputValue);

console.log(filteredData);

//Clear contents of table
tbody.html("");

//write results to table
filteredData.forEach(element => {

    tr = tbody.append('tr')
    tr.append('td').text(element['datetime'])
    tr.append('td').text(element['city'])
    tr.append('td').text(element['state'])
    tr.append('td').text(element['country'])
    tr.append('td').text(element['shape'])
    tr.append('td').text(element['durationMinutes'])
    tr.append('td').text(element['comments'])


})

}