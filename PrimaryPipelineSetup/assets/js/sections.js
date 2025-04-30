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
        step1: ["step1_Velsera_Platform", "step1_Docker_Based(MacOS)", "step1_Docker_Based(LINUX)", 
            "step1_Pipeline_Bundle","step1_Extra_Utilities"],
        step2: ["step2_Cloud_Based_Upload", "step2_CLI_(MacOS)", "step2_CLI_(Windows)"],
        step3: ["step3_Reference_Selector_Tool", "step3_Custom_Reference_Guide", "step3_AbSeq_Custom_Reference"],
        step4: ["step4_Run_on_Velsera", "step4_Run_Locally", "step4_Other_Pipeline_Settings"],
        step5: ["step5_Metrics_Summary", "step5_Bioproduct_Statistics"
            , "step5_Dimensionality_Reduction", "step5_Immune_Cell_Classification", "step5_Data_Tables"
            , "step5_BAM_BAI", "step5_Pipeline_Report_HTML", "step5_Seurat_Cellismo_H5MU"
            , "step5_Protein_Aggregates", 
            "step5_ATAC_Metrics", "step5_ATAC_Fragments", "step5_ATAC_Transposase_Sites",
            "step5_ATAC_Peaks", "step5_ATAC_Peaks_Annotation", "step5_ATAC_DataTables",
        "step5_SMK_Metrics", "step5_SMK_Calls", "step5_SMK_ReadsPerCell", "step5_SMK_PerSample_Folder",
    "step5_VDJ_Metrics", "step5_VDJ_PerCell", "step5_VDJ_Contigs_AIRR"]
    };

    let sectionsNav = document.getElementById('sections-nav');
    sectionsNav.innerHTML = "";
    sectionsNav.innerHTML = `<h4>Sections:</h4>`;

    if (sections[step].length > 0) {
        sectionsNav.style.display = "block";

        sections[step].forEach(section => {
            let button = document.createElement('button');
            button.href = "#";
            let displaySectionName = section.replace(/step\d+_/g, "").replace(/_/g, " ");
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
            window.scrollTo(0, 0); // Scroll to the top of the page
        });
}

function loadSteps(section) {
    fetch(`steps/${section}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            window.scrollTo(0, 0); // Scroll to the top of the page
        });
}


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
    
    