// Step1: pipeline setup 
// step2: Files upload 
// step3: Reference files
// step4: Run the pipeline
// step5: Pipeline output files
// step6: HTML review
// step7: Troubleshooting

const stepSlugMap = {
    step1: 'pipeline-setup',
    step2: 'upload-files',
    step3: 'reference-files',
    step4: 'run-pipeline',
    step5: 'output-files',
    step6: 'html-review',
    step7: 'troubleshooting'
};

const slugToStepMap = Object.fromEntries(
    Object.entries(stepSlugMap).map(([k, v]) => [v, k])
);

function loadStep(step) {
    const filePath = `steps/${step}.html`;
    const stepName = stepSlugMap[step] || step;

    history.pushState({ type: 'step', value: step }, '', `#step-${stepName}`);
    
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            reinitializeScripts();
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
    const filePath = `sections/${section}.html`;
    history.pushState({ type: 'section', value: section }, '', `#section-${section}`);
    
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            reinitializeScripts();
            window.scrollTo(0, 0);
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

window.onpopstate = function(event) {
    if (event.state) {
        if (event.state.type === 'step') {
            loadStep(event.state.value);
        } else if (event.state.type === 'section') {
            loadSection(event.state.value);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;

    if (hash.startsWith("#step-")) {
        const slug = hash.replace("#step-", "");
        const step = slugToStepMap[slug];
        if (step) {
        loadStep(step);
        }
    } else if (hash.startsWith("#section-")) {
        const section = hash.replace("#section-", "");
        loadSection(section);
    }
});