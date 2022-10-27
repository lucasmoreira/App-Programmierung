window.onload = function() {
    document.addEventListener("deviceready", init, false);
    }

function init() {
    var myButton = document.getElementById("btnResources");
    myButton.addEventListener("click", openPageResources, false);

    var myButton = document.getElementById("btnSetup");
    myButton.addEventListener("click", openPageSetup, false);

    var myButton = document.getElementById("btnOrders");
    myButton.addEventListener("click", openPageOrders, false);
    }
        
function openPageResources() {
    window.location = "resources.html";
    }

function openPageOrders() {
    window.location = "order.html";
    }
 
function openPageSetup() {
    window.location = "setup.html";
    }