// Step1: pipeline setup 
// step2: Files upload 
// step3: Reference files
// step4: Run the pipeline
// step5: Pipeline output files
// step6: HTML review
// step7: Troubleshooting

function loadStep(step) {
    fetch(`steps/${step}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            loadSections(step);
        });
}


function loadSections(step) {
    let sections = {
        step1: ["step1_Velsera Platform", "step1_Docker Based(MacOS)", "step1_Docker Based(LINUX)", 
            "step1_Pipeline Bundle","step1_Extra Utilities"],
        step2: ["step2_Cloud Based Upload", "step2_CLI (MacOS)", "step2_CLI (Windows)"],
        step3: ["step3_Reference Selector Tool", "step3_Custom Reference Guide", "step3_AbSeq Custom Reference"],
        step4: ["step4_Run on Velsera", "step4_Run Locally", "step4_Other Pipeline Settings"],
        step5: ["step5_Output Files", "step5_section2", "step5_section3"],
        step6: ["step6_section1", "step6_section2", "step6_section3"],
        step7: ["step7_section1", "step7_section2", "step7_section3"]
    };

    let sectionsNav = document.getElementById('sections-nav');
    sectionsNav.innerHTML = "";
    sectionsNav.innerHTML = "<h4>Subchapter:</h4>";

    if (sections[step].length > 0) {
        sectionsNav.style.display = "block";

        sections[step].forEach(section => {
            let button = document.createElement('button');
            button.href = "#";
            let displaySectionName = section.substring(section.indexOf("_") + 1);
            displaySectionName = displaySectionName.replace(/_/g, " ");
            button.innerText = displaySectionName;
            button.onclick = () => loadSection(section);
            sectionsNav.appendChild(button);
            sectionsNav.appendChild(document.createElement('br'));
        });
    } else {
        sectionsNav.style.display = "none";
    }
}

function loadSection(section) {
    fetch(`sections/${section}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        });
}

function showCheckboxInfo(checkboxID, textID) {
    var checkBox = document.getElementById(checkboxID);
    var text = document.getElementById(textID);
    if (checkBox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
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

