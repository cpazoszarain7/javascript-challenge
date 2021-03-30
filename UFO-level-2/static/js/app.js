


// from data.js
var tableData = data;

//Select table body
var tbody = d3.select('tbody')

//Clear contents of table
tbody.html("");

//write results to table

function populate(data){

    data.forEach(element => {

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

//Initially populate with all data
populate(tableData)

//Populate Drop down menu for Dates
//Create Array of Unique Dates
var Dates = tableData.map(item => item.datetime)

var uniqueDates = Dates.filter((item, i, ar) => ar.indexOf(item) === i);

dropDates = d3.select('#Dates')
uniqueDates.forEach(item =>{

    op = dropDates.append('option')
    op.text(item)

})

//Populate Dropdown menu for City
var City = tableData.map(item => item.city)

var uniqueCity = City.filter((item, i, ar) => ar.indexOf(item) === i);
uniqueCity.sort()

dropCity = d3.select('#City')
uniqueCity.forEach(item =>{

    op = dropCity.append('option')
    op.text(item)

})

//Populate Dropdown menu for State
var State = tableData.map(item => item.state)

var uniqueState = State.filter((item, i, ar) => ar.indexOf(item) === i);
uniqueState.sort()

dropState = d3.select('#State')
uniqueState.forEach(item =>{

    op = dropState.append('option')
    op.text(item)

})

//Populate Dropdown menu for Country
var Country = tableData.map(item => item.country)

var uniqueCountry = Country.filter((item, i, ar) => ar.indexOf(item) === i);
uniqueCountry.sort()

console.log(uniqueCountry)
dropCountry = d3.select('#Country')
uniqueCountry.forEach(item =>{

    op = dropCountry.append('option')
    op.text(item)

})

//Populate Dropdown menu for Shape
var Shape = tableData.map(item => item.shape)

var uniqueShape = Shape.filter((item, i, ar) => ar.indexOf(item) === i);
uniqueShape.sort()
console.log(uniqueShape)
dropShape = d3.select('#Shape')
uniqueShape.forEach(item =>{

    op = dropShape.append('option')
    op.text(item)

})


// Select the button
var button = d3.select('#filter-btn')

// Create event handlers 
button.on("click", runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    //Get the filter for Date
    var Date = document.getElementById("Dates");
    var DateFilter = Date.options[Date.selectedIndex].text;

    //Get the filter for City
    var City = document.getElementById("City");
    var CityFilter = City.options[City.selectedIndex].text;

    //Get the filter for State
    var State = document.getElementById("State");
    var StateFilter = State.options[State.selectedIndex].text;

    //Get the filter for Country
    var Country = document.getElementById("Country");
    var CountryFilter = Country.options[Country.selectedIndex].text;

    //Get the filter for Shape
    var Shape = document.getElementById("Shape");
    var ShapeFilter = Shape.options[Shape.selectedIndex].text;

    // var filteredData = tableData.filter(x => x.datetime == DateFilter && x.city == CityFilter && x.state == StateFilter);

    //Build dictionary of filters
    var query = {

        datetime: DateFilter,
        city: CityFilter,
        state: StateFilter,
        country: CountryFilter,
        shape: ShapeFilter
    }


    //Remove from filter if defaulr value 'All' is present
    clean_query={}

    Object.entries(query).forEach(([key,value ])=>{
    
        if(value != 'All'){
            clean_query[key] = value
        }

    })

    //Apply filters to data
    filteredData= tableData.filter(function(item) {
        for (var key in clean_query) {
        if (item[key] === undefined || item[key] != clean_query[key])
            return false;      
            
        }
        return true;
    });

    
    //Clear contents of table
    tbody.html("");

    //write results to table
    populate(filteredData)

}