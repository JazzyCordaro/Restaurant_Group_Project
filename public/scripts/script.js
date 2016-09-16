// arrays
var tables=[];
var employees= [];
var waiterWaitress = '';
var selectText = '';
var tableStatus= ['empty', 'served', 'dirty', 'seated'];
var concatEmployees = '';

$(document).ready(function () {
  getAll();




});//end document ready


var getAll = function () {
  $.ajax({
    url: '/getemployees',
    type: 'GET',
    success: function (data) {
      console.log('getemployees', data);
      employees = data;
      console.log('employees = ', employees);
      $.ajax({
        url: '/gettables',
        type: 'GET',
        success: function (data) {
          console.log('gettables', data);
          tables = data;
          displayAll();
        }//end success
      });//end ajax gettables
    }//end success
  });//end ajax getemployees
  $.ajax({
    url: '/gettables',
    type: 'GET',
    success: function (data) {
      console.log('gettables', data);
      tables = data;
    }//end success
  });//end ajax gettables

};//end getAll

var displayAll = function () {
  console.log('all employees', employees);
  var displayAllEmployees;
  for (var i = 0; i < employees.length; i++) {
    displayAllEmployees += '<p>' + employees[i].fname + " " + employees[i].lname + '</p>';
  }
  $('#employeesOutput').html(displayAllEmployees);
  var displayAllTables;
  concatEmployees = '';
  for (var i = 0; i < employees.length; i++) {
     concatEmployees += '<option data=' + i +  ">" + employees[i].fname + " " + employees[i].lname + "</option>";
  }
  for (var i = 0; i < tables.length; i++) {
    displayAllTables += '<p>Table' + tables[i].name + " Capacity: " + tables[i].capacity + " Status: " + tables[i].status + '</p><br> <select>' + concatEmployees + '</select><select id="tableStatus"> <option disabled selected>Status</option> <option value="empty">Empty</option> <option value="dirty">Dirty</option> <option value="served">Served</option> <option value="Seated">Seated</option> </select>  <button id="tableInfo" onClick="updateTable()">Submit</button>';
  }
  $('#tablesOutput').html(displayAllTables);
};//end display

var addEmployee = function () {
  //get user input
  var employeeFirstName = $('#employeeFirstNameIn').val();
  var employeeLastName =   $('#employeeLastNameIn').val();

  // create object for employee
  var newEmployee= {
    firstName : employeeFirstName,
    lastName : employeeLastName
  }; // end object

  //ajax call new employee
  $.ajax({
    url: '/newEmployee',
    type: 'POST',
    data: newEmployee,
    success: function (data) {
      console.log('ajax gets back:', data);
      getAll();
      }//end success
    });//end ajax
};//end addEmployee

var addTable = function () {

  //get user input
    var tableName = $('#nameIn').val();
    var tableCapacity = $('#capacityIn').val();

    // table object for new table
    var newTable = {
      'name': tableName,
      'capacity': tableCapacity,
      'server': -1,
      'status': 'empty'
    };//end newTable object
  //ajax call for new table
 $.ajax({
    url: '/newDiningTable',
    type: 'POST',
    data: newTable,
    success: function (data) {
    console.log('ajax gets back:', data);
    getAll();
    }//end success
  });// end ajax
};//end addTable

var updateTable = function () {
  


  var tableUpdate = {
    waitStaff: waiterWaitress,
    tableStatus: $('#tableStatus').val()

  };
   $.ajax({
  url: '/updateTable',
  type: 'POST',
  data: tableUpdate,
   success: function (data) {
  console.log('ajax gets back:', data);
    }//end success
  });// end ajax
};











// var createEmployee = function(){
//   console.log( 'in createEmployee' );
//   // get user input
//   var employeeFirstName = $('#employeeFirstNameIn').val();
//   var employeeLastName =   $('#employeeLastNameIn').val();
//
//   // create object for employee
//   var newEmployee= {
//     firstName : employeeFirstName,
//     lastName : employeeLastName
//   }; // end object
//
//   //ajax call new employee
//   $.ajax({
//     url: '/newEmployee',
//     type: 'POST',
//     data: newEmployee,
//     success: function (data) {
//       console.log('ajax gets back:', data);
//       // push into employees array
//       employees.push( newEmployee );
//       // update display
//       listEmployees();
//     }//end success
//   });//end ajax
// }; // end createEmployee
//
// var createTable = function(){
//   console.log( 'in createTable' );
//   // get user input
//   var tableName = $('#nameIn').val();
//   var tableCapacity = $('#capacityIn').val();
//
//   // table object for new table
//   var newTable = {
//     'name': tableName,
//     'capacity': tableCapacity,
//     'server': -1,
//     'status': 'empty'
//   };//end newTable object
//
//   // push new obejct into tables array
//   tables.push( newTable );
//   console.log( 'added table: ' + newTable.name );
//
//  //ajax call for new table
//   $.ajax({
//     url: '/newDiningTable',
//     type: 'POST',
//     data: newTable,
//     success: function (data) {
//       console.log('ajax gets back:', data);
//     }//end success
//   });// end ajax
//   // update output
//   listTables();
// }; // end createTable
//
// var listEmployees = function(){
//   console.log( 'in listEmployees', employees );
//   $.ajax({
//     url: '/getemployees',
//     type: 'GET',
//     success: function (data) {
//       console.log('getemployees', data);
//       employees = data;
//       $('#employeesOutput').empty();
//       $('#employeesOutput').append('<select id="employeeOptions">');
//       // loop through the tables array and display each table
//       for( i=0; i< employees.length; i++ ){
//         var line = employees[i].fname + ' ' + employees[i].lname + ' ' + employees[i].wait_id;
//         // add line to output div
//         $('#employeeOptions').append('<option>' + line + '</option>');
//       }//end loop
//       $('#employeeOptions').append('</select>');
//     }//end success
//   });//end ajax
//   listTables();
// }; // end listEmployees
//
// var listTables = function(){
//   console.log( "in listTables" );
//   $.ajax({
//     url: '/gettables',
//     type: 'GET',
//     success: function (data) {
//       console.log('gettables', data);
//
//
//   // target our output div
//   // $('#tablesOutput').html(); //--------ADDED-------------\\\\
//   // loop through the tables array and display each table
//   // select to assign a server to this table
//   selectText = '<select id="tableWaitStaff">';
//   for (var i = 0; i < employees.length; i++) {
//   //-----------------//-------fixed dont close the select tag above and leave it open below so it is one
//     selectText += '<option disable>Waiter/Waitress</option><option value=' + i + '>'+ employees[i].firstName + ' ' + employees[i].lastName + '</option> </select>';
//     waiterWaitress = $('#tablesOutput').val();
//   }
//
//   for( i=0; i< tables.length; i++ ){
//     // status is a button that, when clicked runs cycleStatus for this table
//     var line = tables[i].name + " - capacity: " + tables[i].capacity + '  server: ' + selectText + '<select id="tableStatus"> <option disabled selected>Status</option> <option value="empty">Empty</option> <option value="dirty">Dirty</option> <option value="served">Served</option> <option value="Seated">Seated</option> </select>  <button id="tableInfo">Submit</button>';
//     // add line to output div
//     $('#tablesOutput').html('<p>' + line + '</p>');
//     updateTable();
//   }//end for loop
// }//end success
// });//end ajax
// }; // end listTables
//
// var updateTable = function(){
//     $('#tableInfo').on('click', function(){
//     console.log('in tableInfo button');
//     var tableUpdate = {
//       waitStaff: waiterWaitress,
//       tableStatus: $('#tableStatus').val()
//
//     };
//     $.ajax({
//       url: '/updateTable',
//       type: 'POST',
//       data: tableUpdate,
//       success: function (data) {
//         console.log('ajax gets back:', data);
//       }//end success
//     });// end ajax
//         console.log('tableUpdate Object:', tableUpdate);
//   });
// };
