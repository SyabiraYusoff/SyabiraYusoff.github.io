function showNovaseqMessage() {
  const novaseqMessage = document.getElementById("novaseqMessage");
  novaseqMessage.style.display = "block";
  console.log('User have specified using NovaSeqX. The VDJ correction factor will be by default to 1')
}

function deleteRow(r) {
  var table = document.getElementById("inputRows");
  var rowCount = table.rows.length;
  if (rowCount > 0) {
    var i = r.parentNode.parentNode.rowIndex;
    table.deleteRow(i);
  }
}



function showSections() {
const projectNameInput = document.getElementById("project_name");
if (projectNameInput.value){
  console.log(`Project name:`, projectNameInput.value);
  } else {console.log("User did not define a project name.");}
const userNameInput = document.getElementById("userName");
if (userNameInput.value) {
    console.log(`Username:`, userNameInput.value);
    } else {console.log("User is a ghost! No Username provided.");}
    const plexity = document.getElementById("plexity");
    if (plexity.value){
  console.log(`Plexity:`, plexity.value);
} else {console.log("User did not defined the plexity.");}


    const mainFormSubmitMessage = document.getElementById("mainFormSubmitMessage");
    mainFormSubmitMessage.style.display="block";

    //parse number of plexity input and create a table with a dropdown value. 
    //The asssay by row, values by column  
    const plexityTable = document.getElementById("tableContainer"); 
    plexityTable.style.display = "block"; 

    const inputTable = document.getElementById("inputRows"); 
    inputTable.innerHTML="";
    const rowNum = plexity.value;
    console.log(`Generating ${rowNum} of rows`);

    for (let i = 0; i < rowNum; i++) {
      const row = document.createElement("tr"); 
      row.innerHTML= `
      <td>
      <input type="text" id="input${i + 1}a" ></td>
  <td>
    <select id="input${i + 1}b" onChange="assayAvailability(${i + 1})">
    <option value="" disabled selected>Select assay</option>
      <option value="assay-wta">WTA</option>
      <option value="assay-abseq">AbSeq</option>
      <option value="assay-targeted">Targeted</option>
      <option value="assay-smk">SMK</option>
      <option value="assay-tcr">TCR</option>
      <option value="assay-bcr">BCR</option>
      <option value="assay-atac">ATAC</option>
      </select>
      </td>
      <td><input type="text" id="input${i + 1}c"></td>
      <td><input type="text" id="input${i + 1}d"></td>
      <td><input type="number" id="input${i + 1}e">
      <button class="info-button" id="info${i + 1}e" data-info="Info">i</button></td>
      <td><input type="number" id="input${i + 1}f">
      <button class="info-button" id="info${i+1}f" data-info="Info">i</button></td>
      <td><input type="number" id="input${i + 1}g"></td>
      <td><input type="number" id="input${i + 1}h">
      <button class="info-button" id="info${i+1}h" data-info="Info">i</button></td>
      <td><input type="button" value="Remove Library" onclick="deleteRow(this)"></td>
      `;
      inputTable.appendChild(row);

      // Add a spacer row every 10th row
      if ((i + 1) % 10 === 0) {
        const header = document.querySelector('#inputHeader tr').cloneNode(true);
        const spacerRow = document.createElement("tr");
    const newRow = header.cloneNode(true);
    spacerRow.innerHTML = `<td colspan="9" style="height: 20px;"></td>`;
    inputTable.appendChild(spacerRow);
    inputTable.appendChild(newRow);
  }
    }
  }

function getAssayInfo(assay, buttonId) {
const assayInfo = {
    "assay-wta": {
        "infoe": "from-Qubit: >1ng/&microl",
        "infof": "Bioanalyzer/TapeStation: Average peak ~250-1000bp",
        "infoh": "Shallow(10,000rpc) Moderate(20,000-50,000rpc) Deep(100,000rpc)"
    },
    "assay-abseq": {
        "infoe": "from-Qubit: >1.5ng/&microl",
        "infof": "Bioanalyzer/TapeStation: peak ~264bp",
        "infoh": "Unverified Customer Feedback(300-500rpc) 40 plex(40,000rpc) N plex(1,000rpc*n) "
    },
    "assay-targeted": {
        "infoe": "from-Qubit: >1ng/&microl",
        "infof": "Bioanalyzer/TapeStation: Average-peak ~500-600bp",
        "infoh": "Shallow(2,000rpc) Deep(10,000rpc)"
    },
    "assay-smk": {
        "infoe": "from-Qubit: >1ng/&microl",
        "infof": "Bioanalyzer/TapeStation: peak~276bp",
        "infoh": "(600-1200rpc)"
    },
    "assay-tcr": {
        "infoe": "from-Qubit: >1ng/&microl",
        "infof": "Bioanalyzer/TapeStation: Average-peak ~600-800bp",
        "infoh": "Recommended(5,000rpc)"
    },
    "assay-bcr": {
        "infoe": "from-Qubit: >1ng/&microl",
        "infof": "Bioanalyzer/TapeStation: Average-peak ~600-800bp",
        "infoh": "Recommended(5,000rpc)"
    },
    "assay-atac": {
        "infoe": "from-Qubit: >1ng/&microl",
        "infof": "Bioanalyzer/TapeStation: Library size  ~300-2000bp",
        "infoh": "Recommended(50,000rpc)"
    },
    // Add more assay info as needed
};

//extract column index to match the array above
const columnIndex = buttonId.slice(-1);
          return assayInfo[assay][`info${columnIndex}`] || "No info available";
      }

let selectedAssayType = null; //global var to track currently selected assay 
function assayAvailability(row) {
let assayDropdown = document.getElementById(`input${row}b`); 
let selectedAssay = assayDropdown.value;

// Update global var based on assay selection
if (selectedAssay) {
  selectedAssayType = selectedAssay;
} else {
  selectedAssayType = null;
}

const infoButtons = [
document.getElementById(`info${row}e`),
document.getElementById(`info${row}f`),
document.getElementById(`info${row}h`)
];

infoButtons.forEach(button => {
button.setAttribute('data-info', getAssayInfo(selectedAssay, button.id));
});


//disable or enable assay based on current selection
document.querySelectorAll("select[id^='input']").forEach((select, index) => {
  if (index +1 !== row){ 
    Array.from(select.options).forEach((option) => {
      if (selectedAssayType === "assay-atac") {
        option.disabled = option.value !== "assay-atac" && option.value !== "";
      } else if (selectedAssayType && selectedAssayType !== "assay-atac") {
        option.disabled = option.value === "assay-atac";
      } else {
        option.disabled = false;
      }
    });
  }
});
console.log(`selected Assay for row ${row}:`, selectedAssay);
}

function calculateValues(rowsData) {
let globalCorrectionFactor = 1;
const finalLibConc = parseInt(document.getElementById("finalLibConc").value);
if (finalLibConc) {console.log(`Final Lib Conc: ${finalLibConc}`);
} else {console.log("User does not define finalLibConc"); 
alert("Please enter the final library concentration.");}

const finalPoolVol = parseInt(document.getElementById("finalPoolVol").value)||0;
if (finalPoolVol){
  console.log(`Final Pooling Volume: ${finalPoolVol}`);
}else {console.log("User does not define the pooling volume"); 
  alert("Please enter the final pool volume needed.");
}

function specifyCorrectionFactor(rowsData) {
  if (!rowsData) return 1;
  const hasWTA = rowsData.some((input) => input.assayName === "assay-wta");
  const hasTargeted = rowsData.some((input) => input.assayName === "assay-targeted");

  if (hasWTA && hasTargeted) {
    globalCorrectionFactor = 5;
  } else if (hasTargeted) {
    globalCorrectionFactor = 3;
  } else if (hasWTA) {
    globalCorrectionFactor = 5;
  } else {
    globalCorrectionFactor = 1;
  }
  console.log("Global Correction Factor:", globalCorrectionFactor);
}
specifyCorrectionFactor(rowsData);

const novaSeqCheckbox = document.getElementById("novaseq");
let correctionFactor = 1;

novaSeqCheckbox.addEventListener('change', function() {
  correctionFactor = novaSeqCheckbox.checked ? 1 : globalCorrectionFactor;
  console.log("Correction factor after assessing if user tick NovaSeqX box", correctionFactor);
});

//For each row calculation
rowsData.forEach((input) => {
  if (input.assayName === "assay-tcr" || input.assayName === "assay-bcr") {
    correctionFactor = globalCorrectionFactor;
    console.log(`Initial correction factor: ${input.assayName}, ${correctionFactor}`);
    input.correctionFactor = parseFloat(correctionFactor);
  }
  
  if (novaSeqCheckbox.checked) {
    correctionFactor = 1;
    console.log(`NovaSeq checked: ${input.assayName}, ${correctionFactor}`);
    input.correctionFactor = correctionFactor;
  } else if (input.assayName !== "assay-tcr" && input.assayName !== "assay-bcr") {
    correctionFactor = 1;
    console.log(`Correction factor for other assays: ${input.assayName}, ${correctionFactor}`);
    input.correctionFactor = Number(correctionFactor);
  }
  
  // Calc#1: read pairs needed for pooling
  const readPairsNeededForPooling = (
    (input.cellNumber * input.readsPerCell * input.correctionFactor) /1000000);
    console.log(`${input.assayName}: reads pairs needed for pooling: ${readPairsNeededForPooling}`);
    input.readPairsNeededForPooling=parseFloat(readPairsNeededForPooling);

    // Calc#2: readsPerCellForPooling
    input.readsPerCellForPooling = input.readsPerCell * input.correctionFactor;
    console.log(`${input.assayName}: reads per cell needed for pooling: ${input.readsPerCellForPooling}`);
  });

    // Calc#3: total read pairs needed for pooling
    const totalReadPairsForPooling = rowsData.reduce((sum, input) => {
      return sum + (input.readPairsNeededForPooling);
    }, 0);
    console.log(`Total read pairs for pooling: ${totalReadPairsForPooling}`);
  
    rowsData.forEach((input) => {
    // Calc#4: Pooling ratio
  const poolingRatio = input.readPairsNeededForPooling / totalReadPairsForPooling;
  input.poolingRatio = parseFloat(poolingRatio.toFixed(3));

    // Calc#5: Volume for pooling
  let volumeForPooling = poolingRatio * finalPoolVol;
  if (input.assayType === "assay-SMK") {
    volumeForPooling *= 10;
    console.log(`${input.assayName}: Adjusted SMK pooling volume: ${volumeForPooling}`);
  }
  input.volumeForPooling = parseFloat(volumeForPooling.toFixed(2));

    // Calc#6: Qubit nM concentration
  input.qubitnMConc = parseFloat(
    ((input.qubit * 1000000) / (660 * input.bioanalyzer)).toFixed(2)
  );

  // Calc#7: Indexed library needed for pooling
  input.indexedLibraryNeededForPooling = parseFloat(
    ((volumeForPooling * finalLibConc) / input.qubitnMConc).toFixed(2)
  );

  // Calc#8: Elution buffer volume
  input.elutionBufferVolume = parseFloat(
    (volumeForPooling - input.indexedLibraryNeededForPooling).toFixed(2)
  );

  // Calc#9: Total read pairs for sequencing
  const totalReadPairsForSequencing = rowsData.reduce((sum, row) => {
    return sum + (row.cellNumber * row.readsPerCell) / 1_000_000;
  }, 0);
  rowsData.forEach((row) => (row.totalReadPairsForSequencing = totalReadPairsForSequencing));
  console.log(`${input.assayName}: Total read pairs for sequencing: ${totalReadPairsForSequencing}`);

    });
    
}

// PhiX rules. If VDJ >0 && WTA + Targeted >0, set Phix=3, otherwise 15. 
//WTA + Targeted >0, set Phix 1, otherwise 15.
// Function to count occurrences
function specifyPhix(rowsData) {
  let hasVDJ = rowsData.some((input) => input.assayName === "assay-tcr"||input.assayName === "assay-bcr");
  let hasmRNA = rowsData.some((input) => input.assayName === "assay-wta" || input.assayName === "assay-targeted"|| input.assayName === "assay-atac");

  let percent;
  if (hasVDJ) {
    percent = hasmRNA ? 3 : 15;
  } else {
    percent = hasmRNA ? 1 : 15;
  }

  let phixPercentage = percent;
  console.log(`Phix percentage: ${phixPercentage}`);
  return phixPercentage;
}


//create dilution table section 
function resultSection(rowsData) {
const section = document.getElementById("resultsContainer");
section.style.display = "block"; 

const dilutionTable=document.getElementById("libraryDilutionTable");
const dilutionRow = document.getElementById("dilutionTableRow"); 
dilutionRow.innerHTML="";


rowsData.forEach((input, index) => {
  const row = document.createElement("tr");
  row.innerHTML += `
    <td>${input.libraryName}</td>
    <td>${input.assayName}</td>
    <td>${parseFloat(document.getElementById("finalLibConc").value||0)}</td>
    <td>${input.indexedLibraryNeededForPooling}</td>
    <td>${input.elutionBufferVolume}</td>
    <td>${input.volumeForPooling}</td>
  `;

  dilutionRow.appendChild(row);
});
section.innerHTML = '';
section.appendChild(dilutionTable);
// Calculate the percentage based on the data
phixPercentage = specifyPhix(rowsData);
const phix = (rowsData[0].totalReadPairsForSequencing *(phixPercentage*0.01));
const totalPhix = (rowsData[0].totalReadPairsForSequencing + phix);

let negativeDilution = rowsData.some((input) => input.elutionBufferVolume < 0);
let lowSMK = rowsData.some((input) => input.assayName === "assay-smk" && input.volumeForPooling < 0.5);


if (negativeDilution) {
  section.innerHTML += `
  <p style="color: red;"><b>Warning:</b> The current Final Library Concentration is too high for some assay. Please consider a lower Final Library Concentration value and re-calculate the table.</p>`;
}

if (lowSMK) {
  section.innerHTML += `<p style="color: red;"><b>Warning:</b> The pipette volume for pooling (SMK) is too low. Consider to increase the reads per cell in the table input above and re-calculate the table. </p>`;
}

section.innerHTML += `
<p>How to use this table to prepare your library dilution and pooling: <br>
<ul><li>STEP1: Mix the Indexed Library and Elution Buffer to Normalize the library concentration.</li><li>STEP2: In a tube, add all the Library Pooling Volume by row until the end.</li></ul></p><br>
<p><b>Final Library Concentration:
${parseInt(document.getElementById("finalLibConc").value)} nM </p>
<p><b>Total Library Volume:</b> ${parseInt(document.getElementById("finalPoolVol").value)} &microL </p>
<p><b>Total Read Pairs Needed for Sequencing  :</b> ${parseFloat(rowsData[0].totalReadPairsForSequencing.toFixed(2))} Million Reads Pairs or Clusters per Flow Cell</p>
<p><b>Percentage PhiX for Sequencing:</b> ${parseFloat(phixPercentage.toFixed(2))} %</p>
<p><b>Read Pairs Needed for Phix Library :</b> ${parseFloat(phix.toFixed(2))} Million Reads Pairs or Clusters per Flow Cell</p>
<p><b>Total Number of Reads + PhiX: </b> ${parseFloat(totalPhix.toFixed(2))} Million Reads Pairs or Clusters per Flow Cell</p>`;
}



function filterTableByValue(threshold){
const section = document.getElementById("recommendationContainer");
section.style.display = "block";

const rows = document.getElementById("recommendationRows");
rows.innerHTML = ""; 

// Add the filtered rows back
const allRows = [
  { platform: "Miniseq Mid Output", cycle: "300", pairs: 7, concentration: "1.4-1.8pM" },
  { platform: "Miseq Reagent kit v2", cycle: "300, 500", pairs: 12, concentration: "contact local FAS" },
  { platform: "Miniseq High Output", cycle: "150, 300", pairs: 22, concentration: "1.4-1.8pM" },
  { platform: "Miseq Reagent kit v3", cycle: "150, 600", pairs: 22, concentration: "contact local FAS" },
  { platform: "NextSeq 1000/2000 P1", cycle: "300", pairs: 100, concentration: "contact local FAS" },
  { platform: "NextSeq 550 Mid Output", cycle: "150, 300", pairs: 130, concentration: "1.4-1.8pM" },
  { platform: "HiSeq 4000 (Single Lane)", cycle: "150, 300", pairs: 313, concentration: "contact local FAS" },
  { platform: "NovaSeq 6000 S Prime (Single Lane)", cycle: "100, 200, 300, 500 ***", pairs: 325, concentration: "180-250pM (XP workflow)" },
  { platform: "NextSeq 550 High Output", cycle: "150, 300", pairs: 400, concentration: "1.4-1.8pM" },
  { platform: "NextSeq 1000/2000 P2", cycle: "200, 300", pairs: 400, concentration: "contact local FAS" },
  { platform: "NovaSeq 6000 S Prime (Single Flow Cell)", cycle: "100, 200, 300, 500 ***", pairs: 650, concentration: "350-650 pM (standard workflow)" },
  { platform: "NovaSeq 6000 S1 (Single Lane)", cycle: "100, 200, 500 ***", pairs: 650, concentration: "180-250pM (XP workflow)" },
  { platform: "NextSeq 2000 P3", cycle: "200, 300", pairs: 1200, concentration: "contact local FAS" },
  { platform: "NovaSeq 6000 S1 (Single Flow Cell)", cycle: "100, 200, 300 ***", pairs: 1300, concentration: "350-650 pM (standard workflow)" },
  { platform: "NovaSeq 6000 S4 (Single Lane)", cycle: "200, 300", pairs: 2000, concentration: "180-250pM (XP workflow)" },
  { platform: "HiSeq 4000 (Single Flow Cell)", cycle: "150, 300", pairs: 2500, concentration: "contact local FAS" },
  { platform: "NovaSeq 6000 S2 (Single Flow Cell)", cycle: "100, 200, 300 ***", pairs: 3300, concentration: "350-650 pM (standard workflow)" },
  { platform: "NovaSeq 6000 S4 (Single Flow Cell)", cycle: "200, 300", pairs: 8000, concentration: "350-650 pM (standard workflow)" },
  { platform: "NovaSeq X 10B", cycle: "200, 300", pairs: 10000, concentration: "contact local FAS" }
];

// Filter rows based on the threshold value
const filteredRows = allRows.filter(row => row.pairs > threshold);

// Populate the table with the filtered rows
filteredRows.forEach(row => {
  const newRow = rows.insertRow();
  const platformCell = newRow.insertCell(0);
  const cycleCell = newRow.insertCell(1);
  const pairsCell = newRow.insertCell(2);
  const concentrationCell = newRow.insertCell(3);

  platformCell.textContent = row.platform;
  cycleCell.textContent = row.cycle;
  pairsCell.textContent = row.pairs;
  concentrationCell.textContent = row.concentration;
});
console.log(filteredRows);
console.log(`Filtered table to show platforms with pairs > ${threshold}`);

section.innerHTML +=`
<p>*NovaSeq 100 cycle kit (v1.0 or v1.5) can be used. The 100-cycle kit contains enough reagents for up to 130 cycles.</p>`;
}

//for each row, extract the values from a to h
const rowsData = [];
function submit() {
rowsData.length = 0;
const rowNum = plexity.value;

for (let row = 1; row <= rowNum; row++){

  const libraryName = document.getElementById(`input${row}a`);
  if (libraryName){
    const input = {
      libraryName: libraryName.value, 
      assayName: document.getElementById(`input${row}b`).value||"", 
      index5: document.getElementById(`input${row}c`).value||"", 
      index7: document.getElementById(`input${row}d`).value||"", 
      qubit: parseFloat(document.getElementById(`input${row}e`).value)||0, 
      bioanalyzer: parseFloat(document.getElementById(`input${row}f`).value)||0, 
      cellNumber: parseFloat(document.getElementById(`input${row}g`).value)||0, 
      readsPerCell: parseFloat(document.getElementById(`input${row}h`).value)||0,
    };
    rowsData.push(input);
  }
}


console.log(`rows data collected:`, rowsData);
calculateValues(rowsData);
resultSection(rowsData);

phixPercentage = specifyPhix(rowsData);
const phix = (rowsData[0].totalReadPairsForSequencing *(phixPercentage*0.01));
const totalPhix = (rowsData[0].totalReadPairsForSequencing + phix);

filterTableByValue(totalPhix);


// Add an input field for the user to specify the PDF name
const pdfNameInput = document.createElement("input");
pdfNameInput.type = "text";
pdfNameInput.id = "pdfName";
pdfNameInput.placeholder = "Enter file name";
pdfNameInput.style.marginRight = "15px";

// Add "Save as PDF" button below the last table
const saveButton = document.createElement("button");
saveButton.textContent = "Save as .PDF";
saveButton.onclick = saveAsPDF;
saveButton.classList.add("primary-button");

// Append input field and button to resultsContainer
const pdfSection = document.getElementById("savePDFsection");
pdfSection.style.display = "block";
pdfSection.appendChild(pdfNameInput);
pdfSection.appendChild(saveButton);

async function saveAsPDF() {
const { jsPDF } = window.jspdf;

const resultsContainer = document.getElementById("results-container");
const pdfNameInput = document.getElementById("pdfName");
const saveButton = pdfNameInput.nextElementSibling;

// Temporarily hide the PDF name input and save button
pdfNameInput.style.display = "none";
saveButton.style.display = "none";


const margin = 15;
const headerHeight = 40; // Space for header
const footerHeight = 40; // Space for footer

const pdf = new jsPDF("p", "pt", "a4");

// Function to add a section to the PDF
async function addSectionToPDF(sectionId, yOffset) {
  const section = document.getElementById(sectionId);
  await html2canvas(section, {
    scale: 2,
    useCORS: true,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);
    yOffset += imgHeight + margin; // Adjust yOffset for the next section
  });
  return yOffset; // Return the new yOffset
}

// Header text
const currentDate = new Date();
const dateString = currentDate.toLocaleDateString();
const timeString = currentDate.toLocaleTimeString();
const projectName = document.getElementById("project_name")?.value || "not specified";
const userName = document.getElementById("userName")?.value || "not specified";

pdf.setFontSize(10);
pdf.text(`Date: ${dateString} | Time: ${timeString}`, margin, 20);
pdf.text(`Project Name: ${projectName}`, margin, 30);
pdf.text(`UserName: ${userName}`, margin, 40);

let yOffset = headerHeight + margin;

// Add multiple sections to the PDF
yOffset = await addSectionToPDF("resultsContainer", yOffset);
yOffset = await addSectionToPDF("recommendationContainer", yOffset);

// Footer text
const footerY = yOffset + 10;
const emailNote = "This is an initial release for our Sequencing Calculator. Please contact syabira.yusoff@bd.com if you have any comments, improvement or any details are not clear from the Sequencing calculator";
const wrappedText = pdf.splitTextToSize(emailNote, pdf.internal.pageSize.getWidth() - 2 * margin);
pdf.text(wrappedText, margin, footerY);

// Save the PDF with the specified file name or default to "results.pdf"
const fileName = pdfNameInput.value || "results";
pdf.save(`${fileName}.pdf`);

// Restore visibility of the input and save button
pdfNameInput.style.display = "inline";
saveButton.style.display = "inline";
}

}





