// Step1: pipeline setup 
// step2: Files upload 
// step3: Reference files
// step4: Run the pipeline
// step5: Pipeline output files
// step6: HTML review
// step7: Troubleshooting

function loadHome() {
    window.location.href = '/PrimaryPipelineSetup/index.html';
}

function loadStep(step) {
    const filePath = `/PrimaryPipelineSetup/steps/${step}.html`;
    history.pushState(null, null, filePath);

    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        });
}

function toggleSubStep(step){
    loadStep(step);
    let subStepElement = document.getElementById(step);
    if (subStepElement.style.display === "none" || subStepElement.style.display === "") {
        subStepElement.style.display = "block";
    } else {
        subStepElement.style.display = "none";
    }
}  

function loadSection(section) {
    const filePath = `/PrimaryPipelineSetup/sections/${section}.html`;
    history.pushState(null, null, filePath);
    
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            window.scrollTo(0, 0); // Scroll to the top of the page
        });
}

//not used???//
function loadSteps(section) {
    fetch(`steps/${section}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            window.scrollTo(0, 0); // Scroll to the top of the page
        });
}

//not used!//
function loadSectionID(section, targetId = null) {
    fetch(`sections/${section}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            
            // Wait a tick to let the browser render the inserted HTML
            requestAnimationFrame(() => {
                if (targetId) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
}

document.querySelectorAll('.sidebar-right button').forEach(button => {
    button.addEventListener('click', () => {
        const mainPageButton = document.querySelector('.mainPageButton');
        mainPageButton.classList.add('focus');
    });
});

function showCheckboxInfo(checkboxID, textID) {
    var checkBox = document.getElementById(checkboxID);
    var text = document.getElementById(textID);
    if (checkBox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function showAlert() {
    const alertBox = document.getElementById("alert-reference");
    alertBox.style.display = "block";
    setTimeout(function() {
        alertBox.style.display = "none";
    }, 5000); // Hide after 3 seconds
}

//button print image 
function changeImage(imageSrc) {
    var displayedImage = document.getElementById("defaultImage");
    displayedImage.src = imageSrc;
    displayedImage.style.display = 'block';
}

//button print image 
function changeImage2(imageSrc) {
    var displayedImage = document.getElementById("defaultImage2");
    displayedImage.src = imageSrc;
    displayedImage.style.display = 'block';
}

//tabbed gallery image


function displayTabbedGraph(imgs, text) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    expandImg.parentElement.style.display = "block";
    
    var textElements = document.querySelectorAll('[id^="image"]');
    textElements.forEach(function(element) {
        element.style.display = "none";
    });
    
    var textElement = document.getElementById(text);
    textElement.style.display = "block";
}

function displayTabbedCC(imgs, text) {
    var expandImg = document.getElementById("expandedImg2");
    var imgText = document.getElementById("imgtext2");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    expandImg.parentElement.style.display = "block";
    
    var textElements = document.querySelectorAll('[id^="image"]');
    textElements.forEach(function(element) {
        element.style.display = "none";
    });
    
    var textElement = document.getElementById(text);
    textElement.style.display = "block";
}
    
    