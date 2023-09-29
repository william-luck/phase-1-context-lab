'use strict'

const bibloArray = ['biblo', 'luck', 'me', 20]


const createEmployeeRecord = employeeArray => {
    const employeeRecordObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3], 
        timeInEvents: [], // 'this' refers to the object created, makes sense because we are referring to the object itself.
        timeOutEvents: []
    }
    // is there anyway I can make these, probably just the timeIn and timeOut properties, functions?

    return employeeRecordObj;
}



// use this, bind, call, apply on all the functions that take in employeeRecordObj, default context.


// takes in an array of arrays of employee information, returns an object with employee records 
const createEmployeeRecords = allEmployeesArray => {
    let employeeRecords = [];
    for (const record of allEmployeesArray) { 
        employeeRecords.push(
            createEmployeeRecord(record) // creates a record for each employee, populates a new object
        )
    }
    return employeeRecords;
}

function createTimeInEvent(dateTimeStamp) {
    // want to return the record that was just updated.
    // normally we would pass in the employeeRecordObj, but that is not explicity passed as an argument 
    // using 'this', we need to set that employee record as a default.
    // this refers to the object to the left of the dot ya know. 

    // how can we refer to an object if its not passed into the function? Do we need to? Yeahhhh

    // Want to create a copy of the createTimeInEvent, in which the context is permanently bound to the employee record obj

    // THe problem with the examples is that the object exists within a function, so I think we have to call the function inside this function to get access to the object.
            // call the createEmployeeRecord function .bind(object that we want to be bound with the function)
            //createTimeInEvent = someOtherFunctionUsingThis.bind(createEmployeeRecord())
            // then if we do createTimeInEvent(dateTimeStamp), will return that obj with updated.


    // Second time around: Don't think I need to use call, apply, bind that much, and should instead use 'this'.

    // Definetely have to use call/apply, to tell JS that instead of the record being a parameter, teh record can be assumed as a context and thus accessbile via 'this'

    

    

    console.log(this)


    const newTimeInEvent = {
        type: 'TimeIn',
        hour: parseInt((dateTimeStamp.substring(11)), 10),
        date: dateTimeStamp.substring(0, 10)
    };


    this.timeInEvents.push(newTimeInEvent)


    return this;
    // somehow how this timeInEvent should be added to an employee record (that is not passed in)

    // wait...... don't have to include it in the function because the calls/applys come out of the function. If this works, it was a fundamental misunderstanding imo.
}

createTimeInEvent('string')

function createTimeOutEvent(dateTimeStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt((dateTimeStamp.substring(11)), 10),
        date: dateTimeStamp.substring(0, 10)
    })
    return this;
}

function hoursWorkedOnDate (dateStamp) {
    const timeInHour = findMatchingTimeInHour(this, dateStamp)
    const timeOutHour = findMatchingTimeOutHour(this, dateStamp)
    return ((timeOutHour - timeInHour)/100)


}
            // Helper function for hoursWorkedOnDate
            function findMatchingTimeInHour(employeeRecordObj, dateStamp){
                for (const event of employeeRecordObj.timeInEvents) {
                    if (event.date === dateStamp) {
                        return event.hour;
                    }
                }
            }

            // Helper function for hoursWorkedOnDate
            function findMatchingTimeOutHour(employeeRecordObj, dateStamp) {
                for (const event of employeeRecordObj.timeOutEvents) {
                    if (event.date === dateStamp) {
                        return event.hour;
                    }
                }
            }

function wagesEarnedOnDate(dateStamp) {
    const hours = hoursWorkedOnDate.call(this, dateStamp)
    const wages = hours * (this.payPerHour);
    return wages;
}

// takes in an array of employee records, returns the matching record by first name
function findEmployeeByFirstName(employeeRecordsArray, firstName) {
    for (const record of employeeRecordsArray) {
        if (record.firstName === firstName) {
            return record;
        }
    }
}

function calculatePayrollReference(employeeRecordArray) {
    /*
    I think for each record, we can just call the allWagesFor function on that record.
        Populate each of those wages into an array
        reduce method for that array
    */

    let allWagesArray = [];
    for (const employee of employeeRecordArray) {
        let wagesOwedToEmployee = allWagesFor(employee);
        allWagesArray.push(wagesOwedToEmployee)
    }

    const totalOwed = allWagesArray.reduce((accumulator, wage) => accumulator + wage)
    return totalOwed

}

function calculatePayroll(employeeRecordArray) {
    let allWagesArray = [];
    for (const record of employeeRecordArray) {
        let wagesOwedToEmployee = allWagesFor.call(record); // the argument is just passing 'this' in
        allWagesArray.push(wagesOwedToEmployee)
    }

    const totalOwed = allWagesArray.reduce((accumulator, wage) => accumulator + wage)
    return totalOwed    
}




/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

