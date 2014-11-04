/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var startLocationItems = ["Freistadt-Bahnhof", "Roßleiten-Bahnhof"];
var targetLocationItems = [["Freistadt-Stadtplatz", "Freistadt-Stifterstraße"], ["Roßleiten-Hauptplatz", "Roßleiten-..."]];
initializeStartLocations();

var min = new Date();
var max = new Date();
addTime(min, 1000 * 60 * 20);
addTime(max, 1000 * 60 * 60 * 24 * 7 * 2);
document.getElementById('header').offsetTop = 0;
document.getElementById('header').offsetHeight = 0;

var datePicker = new Pikaday({
    field: document.getElementById('datePicker'),
    container: document.getElementById('datePickerLocation'),
    maxDate: max,
    minDare: min,
    defaultDate: min//,
    //position: "top left"
});

datePicker.gotoDate(min.toString());

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("footer").addEventListener('click', this.requestTaxi, true);

        document.getElementById("startLocPicker").addEventListener('change', setTargetLocations, true);
        document.addEventListener('deviceready', setTargetLocations, true);
    },

    requestTaxi: function(){
        //This is what happens when the footer has been clicked:

        var startLocPicker = document.getElementById("startLocPicker");
        var startLoc = startLocPicker.options[startLocPicker.selectedIndex].text;

        var targetLocPicker = document.getElementById("targetLocPicker");
        var targetLoc = targetLocPicker.options[targetLocPicker.selectedIndex].text;

        //var date = datePicker.getDate();
        //var time = timePicker.getTime();
        //alert(date);
        alert(startLoc);
        //now request the taxi from the server!

    },

    onDeviceReady: function() {
    }
};

//initializes the startLocPicker select item with the data in the startLocationItems array
function initializeStartLocations() {
    var startLocPicker = document.getElementById("startLocPicker")

    for (var i = 0; i < startLocationItems.length; i++) {
        var newOption = document.createElement('option');
        newOption.appendChild(document.createTextNode(startLocationItems[i]));
        newOption.value = startLocationItems[i];
        startLocPicker.appendChild(newOption);
    }
}

setTargetLocations = function(){
    //what happens when the selected startLocation is changed...
    var selectedStartLoc = document.getElementById("startLocPicker");
    selectedStartLoc = selectedStartLoc.selectedIndex;

    var targetLocPicker = document.getElementById("targetLocPicker");
    removeChildNodes("targetLocPicker");

    for (var i = 0; i < targetLocationItems[selectedStartLoc].length; i++) {
        var newOption = document.createElement('option');
        newOption.appendChild(document.createTextNode(targetLocationItems[selectedStartLoc][i]));
        newOption.value = targetLocationItems[selectedStartLoc][i];
        targetLocPicker.appendChild(newOption);
    }
};

function removeChildNodes(id){
    var thisNode = document.getElementById(id);
    thisNode.innerHTML = "";
}

function addTime(dateObject, timeToAdd){
    dateObject.setTime(dateObject.getTime() + timeToAdd);
}