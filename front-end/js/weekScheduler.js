// Initialize objects
var daySchedule = [];
var weekSchedule = [];
var weekDays = ["L", "M", "X", "J", "V", "S", "D"];

for (i = 0; i < 24; i++) { daySchedule[i] = false; }
for (i = 0; i < 7; i++) { weekSchedule[i] = daySchedule; }

// Initialize localVariables in/from the Browser
localStorage.weekSchedule = (localStorage.weekSchedule || JSON.stringify(weekSchedule));
weekSchedule = JSON.parse(localStorage.weekSchedule);

// HTML Creator function
function weekSchedulerCreateHTML(divName) {
    var weekControl = ""
    // Create column with hours
    weekControl += "<div class=" + "dayScheduler>";
    weekControl += "<label class=" + "schedulerTitle></label>";
    for (j = 0; j < 24; j++) {
        weekControl += "<label class=" + "schedulerTitle" + ">" + j + ":00" + "</label>";
    };
    weekControl += "</div>";

    for (i = 0; i < 7; i++) {
        weekControl += "<div class=" + "dayScheduler" + " id = " + weekDays[i] + ">"
        weekControl += "<label class=" + "schedulerTitle" + ">" + weekDays[i] + "</label>";
        var dayControl = "";
        for (j = 0; j < 24; j++) {
            dayControl += "<label class=" + "hourCheckbox" + "><input type=" + "checkbox" + " id= " + "hour_" + i + "-" + j + "><span class=" + "checkmark" + "></span></label>";
        };
        weekControl += dayControl;
        weekControl += "</div>"
    };
    $(divName).html(weekControl);
}

// Function to update HTML from weekSchedule
function weekSchedulerUpdateHTML(weekSchedule) {
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 24; j++) {
            hour_id = "#" + "hour_" + i + "-" + j;
            $(hour_id).prop("checked", weekSchedule[i][j]);
        }
    }
}

// Function to get a string variable from the HTML
function weekSchedulerJSONFromHTML(weekSchedule) {
    var hour_id;
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 24; j++) {
            hour_id = "#" + "hour_" + i + "-" + j;
            weekSchedule[i][j] = $(hour_id).is(":checked");
        }
    }
    return JSON.stringify(weekSchedule);
}

////////////////////////////////////////////////////////////////////////////////////////////
// Initialize objects
var timerSettings = [15,15,15,15];

// Initialize localVariables in/from the Browser
localStorage.timerSettings = (localStorage.timerSettings || JSON.stringify(timerSettings));
timerSettings = JSON.parse(localStorage.timerSettings);

// Create HTML structure for the timeAdjuster
function timeAdjusterCreateHTML(divName) {
    var timerControl = "";
    for (i = 0; i < 4; i++) {
        timerControl += "<div class= " + "timeZoneControl" + ">";
        timerControl += "<label class=" + "schedulerTitle" + "> Zona " + (i + 1) + "</label>";
        timerControl += "<input type=" + " range" + " min= " + " 0 " + "max=" + "30" + " value=" + "15" + " class=" + "slider" + " id=" + "timerzone" + i + ">";
        timerControl += "<label class=" + "schedulerTitle" + " id=" + "timervaluezone" + i + "></label>"
        timerControl += "</div>";
    }
    $(divName).html(timerControl);

    // Configure the events for displaying the values
    $("#timerzone0").on('input', function () { $("#timervaluezone0").html($("#timerzone0").val() + " minutos") });
    $("#timerzone1").on('input', function () { $("#timervaluezone1").html($("#timerzone1").val() + " minutos") });
    $("#timerzone2").on('input', function () { $("#timervaluezone2").html($("#timerzone2").val() + " minutos") });
    $("#timerzone3").on('input', function () { $("#timervaluezone3").html($("#timerzone3").val() + " minutos") });
}

function timeAdjusterUpdateHTML(timerSettings) {
    var timer_id, timervalue_id;
    for (i = 0; i < 4; i++) {
        timer_id = "#timerzone" + i;
        timervalue_id = "#timervaluezone" + i;
        $(timer_id).val(timerSettings[i]);
        $(timervalue_id).html(timerSettings[i] + " minutos");
    }
}

function timeAdjusterJSONFromHTML(timerSettings) {
    var timer_id;
    for (i = 0; i < 4; i++) {
        timer_id = "#timerzone" + i;
        timerSettings[i] = $(timer_id).val();
    }
    return JSON.stringify(timerSettings);
}