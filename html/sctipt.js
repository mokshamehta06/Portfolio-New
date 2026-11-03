

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";  
    
    
}
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxlr6NiSqN7IFpHgps186R_shUMrp1BKWfZJ9MO_c_lpD-NB-aOJzCKLohrVADlOs46iQ/exec';
        const form = document.forms['submit-to-google-sheet1']; // Match form name
        const responseMessage = document.getElementById('response-message');
    
        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    responseMessage.innerHTML = 'Success! Your message has been sent.'; // Display success message
                    console.log('Success!', response);
                })
                .catch(error => {
                    responseMessage.innerHTML = 'Error! Something went wrong.'; // Display error message
                    console.error('Error!', error.message);
                });
        });

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    // Remove active class from all tab links
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    // Hide all tab contents
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    // Add active class to the clicked tab and its corresponding content
    document.querySelector(`.tab-links[onclick="opentab('${tabname}')"]`).classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
