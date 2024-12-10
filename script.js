function closeBanner(){
  const banner= document.getElementById("betaBanner");
  banner.style.display = "none";
}

function showNovaseqMessage() {
  const novaseqMessage = document.getElementById("novaseqMessage");
  novaseqMessage.innerHTML=`
  <p><span style="font-size:20px;color:#004593;">Enabling this box would affect library pooling for TCR/BCR assays. Please be sure you are indeed using NovaSeqX before proceed.</span><br />`;
  console.log('User have specified using NovaSeqX. The VDJ correction factor will be by default to 1')
}

// Show the sections based on the number selected
function showSections() {
    const displayArea1 = document.getElementById("displayArea1");
    displayArea1.innerHTML = `
      <p>We received the input details. The calculated Indexed libraries will be dependent on the Final Library Concentration as well as the Final Pooled Volume. Inaccurate details would results in inaccuracy of reads between libraries</p>`;
  
    const projectNameInput = document.getElementById("project_name");
    console.log(`The project name:`, projectNameInput.value);
    const userNameInput = document.getElementById("userName");
    console.log(`The Username:`, userNameInput.value);
    const finalLibConcInput = document.getElementById("finalLibConc");
    console.log(
      `The input Final Library Concentration:`,
      finalLibConcInput.value,
    );
    const finalPoolVolInput = document.getElementById("finalPoolVol");
    console.log(
      `This is the Final Volume needed for Pooling:`,
      finalPoolVolInput.value,
      `proceed with user selecting the numbers of libraries to be pooled together...`,
    );
  
    const requiredFields = [
      projectNameInput,
      userNameInput,
      finalLibConcInput,
      finalPoolVolInput,
    ];
    let isFormValid = true;
  
    requiredFields.forEach((input) => {
      if (!input.value.trim()) {
        //check if input value is empty
        input.classList.add("error-border");
        isFormValid = false;
      } else {
        input.classList.remove("error-border");
      }
    });
  
    if (!isFormValid) {
      alert("Please fill out all required fields.");
      return;
    }
  
    document
      .querySelectorAll(".section")
      .forEach((section) => (section.style.display = "none"));
  
    let selectedOption = document.getElementById("dropdown").value;
    let numSections = parseInt(selectedOption.replace("section", ""));
  
    if (!isNaN(numSections)) {
      for (let i = 1; i <= numSections; i++) {
        document.getElementById(`section${i}`).style.display = "block";
      }
  
      //scroll
      const lastSection = document.getElementById(`section${numSections}`);
      lastSection.scrollIntoView({ behavior: "smooth", block: "end" });
  
      console.log(
        `User selected`,
        numSections,
        `libraries to be pooled. Moving on to the specific section input and calculation`,
      );
    }
  }
  
  const maxSections = 10;
  const assayNames = ["WTA", "AbSeq", "Targeted", "SMK", "ATAC", "TCR", "BCR"];
  const assayInfo = {
    WTA: `<div style = "color: rgb(48,48,48);"><h4>Recommendation for WTA Library</h4><p><strong >Note:</strong><br>Expected concentration = >1ng/&microl<br>Bioanalyzer average peak ~250 - 1000 bp<br><br>Recommended Reads Per Cell:<ul><li>Shallow sequencing: 10,000 reads per Cell</li><li>Moderate Sequencing: 50,000 reads per cell</li><li>Deep Sequencing: 100,000 reads per cell</li></ul><br><br></p></div>`,
    AbSeq: `<div style = "color: rgb(48,48,48);"><h4>Recommendation for AbSeq Library</h4><p><strong>Note:</strong><br>Expected concentration = >1.5ng/&microl<br>Bioanalyzer average peak ~264 bp<br><br>Recommended Reads Per Cell:<ul><li>40-plex, resting PBMCs: 40,000 reads per Cell</li><li>N-plex, resting PBMCs: 1,000 reads per cell * n</li></ul><br><br></p></div>`,
    Targeted: `<div style = "color: rgb(48,48,48);"><h4>Recommendation for Targeted Library</h4><p><strong>Note:</strong><br>Expected concentration = >1.5 ng/&microl<br>Bioanalyzer average peak 500-600 bp<br><br>Recommended Reads Per Cell:<ul><li>Shallow, to cluster cell type: 2,000 reads per Cell</li><li>Deep Sequencing (RSEC > 6): 10,000 reads per cell</li></ul><br><br></p></div>`,
    SMK: `<div style = "color: rgb(48,48,48);"><h4>Recommendation for SMK Library</h4><p><strong>Note:</strong><br>Expected concentration = >1.5 ng/&microl<br>Bioanalyzer average peak 276 bp<br><br>Recommended Reads Per Cell:<ul><li>Pooling same types of cells: 120 reads per Cell</li><li>Pooling different types of cells: 600 reads per cell</li></ul><br><br> <strong style="color:red;">Warning:</strong><br> If the amount of SMK is less than 0.5 &microl, consider double the amount of reads per cell. We recommend 1,000 reads per cell</p></div>`,
    ATAC: ``,
    TCR: `<div style = "color: rgb(48,48,48);"><h4>Recommendation for TCR Library</h4><p><strong >Note:</strong><br>Expected concentration = >1.5ng/&microl<br>LIbrary size ~200 - 1000 bp<br>Bioanalyzer peak ~600-800 bp<br>Recommended Reads Per Cell:5,000<br><br></p></div>`,
    BCR: `<div style = "color: rgb(48,48,48);"><h4>Recommendation for BCR Library</h4><p><strong >Note:</strong><br>Expected concentration = >1.5ng/&microl<br>LIbrary size ~200 - 1000 bp<br>Bioanalyzer peak ~600-800 bp<br>Recommended Reads Per Cell:5,000<br><br></p></div>`,
  };
  
  let selectedAssayType = null; //global var to track selected assay type
  function showAssayInfo(sectionNum) {
    let dropdown = document.getElementById(`dropdown${sectionNum}`);
    let selectedAssay = dropdown.value;
  
    //update global var based on assay selection
    if (selectedAssay) {
      selectedAssayType = selectedAssay;
    } else {
      selectedAssayType = null;
    }
  
    //disable and enable options
    document.querySelectorAll("select[id^='dropdown']").forEach((select) => {
      Array.from(select.options).forEach((option) => {
        if (selectedAssayType === "ATAC") {
          option.disabled = option.value !== "ATAC" && option.value !== "";
        } else if (selectedAssayType && selectedAssayType !== "ATAC") {
          option.disabled = option.value === "ATAC";
        } else {
          option.disabled = false;
        }
      });
    });
  
    // Hide all info sections and inputs first
    document
      .querySelectorAll(`#section${sectionNum}.info-section`)
      .forEach((info) => (info.style.display = "none"));
    document
      .querySelectorAll(`#section${sectionNum} .input-section`)
      .forEach((inputs) => (inputs.style.display = "none"));
  
    // Display selected info section and corresponding inputs
    if (selectedAssay) {
      const assayInfoSection = document.getElementById(
        `info${sectionNum}${selectedAssay}`,
      );
      assayInfoSection.style.display = "block";
      document.getElementById(`inputs-${sectionNum}`).style.display = "block";
  
      //scroll to newly added content
      assayInfoSection.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }
  
  function createSections() {
    let container = document.getElementById("sections-container");
    for (let sectionNum = 1; sectionNum <= maxSections; sectionNum++) {
      let sectionHTML = `<div id="section${sectionNum}" class="section" style="display:none;"><h3>Section ${sectionNum} Assay</h3>`;
  
      sectionHTML += `
        <div class="dropdown-section">
          <label for="dropdown${sectionNum}">Choose your assay:</label>
          <select id="dropdown${sectionNum}" onChange="showAssayInfo(${sectionNum})">
            <option value="">Select an assay</option>
            ${assayNames.map((name) => `<option value="${name}">${name}</option>`).join("")}
          </select>
        </div>`;
  
      //create a info-section div element for each assay
      assayNames.forEach((assayName) => {
        sectionHTML += `
          <div class="info-section" id="info${sectionNum}${assayName}" style="display:none;">
            ${assayInfo[assayName] || "No information available."}
          </div>`;
      });

      //for each section
      sectionHTML += `
        <div id="inputs-${sectionNum}" class="input-section" style="display:none;">
          <div class="form-group2">
            <label for="input${sectionNum}a">Library Name:</label>
            <input class="form-input2" id="input${sectionNum}a" placeholder="Please type your library name here" required>
          </div>
          <br>
          <div class="form-group2">
            <label for="input${sectionNum}h">i7 Index Name:</label>
            <input list = "indexNameOption" class="form-input2" type="text" id="input${sectionNum}h" placeholder="Use the dropdown arrow to select your index name" oninput="checkOtherOption()">
            <datalist id = "indexNameOption">
            <option value = "Nextera N709 (AGCGTAGC)">
            <option value = "Nextera N710 (CAGCCTCG)">
            <option value = "Nextera N711 (TGCCTCTT)">
            <option value = "Nextera N712 (TCCTCTAC)">
            <option value = "Others?">
            </datalist>
          </div>
          <br>
          <div class="form-group2">
            <label for="input${sectionNum}c">Cell Number:</label>
            <input type = "number" id="input${sectionNum}c" class="form-input2" placeholder="Scanner combined report: Number of viable cells captured in wells with a bead value ">
          </div>
          <br>
          <div class="form-group2">
            <label for="input${sectionNum}d">Qubit Concentration (ng/&microl):</label>
            <input type="number" id="input${sectionNum}d" class="form-input2" placeholder="Expected concentration above 1 ng/&microl">
          </div>
          <br>
          <div class="form-group2">
            <label for="input${sectionNum}e">Average size (bp):</label>
            <input type="number" id="input${sectionNum}e" class="form-input2" placeholder="Expected peak from 250 - 1000bp">
          </div>
          <br>
          <div class="form-group2">
            <label for="input${sectionNum}f">Reads Per Cell:</label>
            <input type="number" id="input${sectionNum}f" class="form-input2" placeholder="Please refer to the information above for guidance" >
          </div>
          <br>
        </div>
      </div>`;
  
      container.insertAdjacentHTML("beforeend", sectionHTML);
  
      const newSection = document.getElementById(`section${sectionNum}`);
      newSection.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }
  
  function submitAllValues() {
    const sectionsData = [];
    console.log('Starting to collect section data');
    console.log('maxSections:', maxSections);
  
    for (let sectionNum = 1; sectionNum <= maxSections; sectionNum++) {
      const sectionElement = document.getElementById(`section${sectionNum}`);
      console.log(`Processing section${sectionNum}:`, sectionElement);
  
      if (sectionElement && sectionElement.style.display !== "none") {
        const data = {
          assayName: document.getElementById(`dropdown${sectionNum}`).value,
          libraryName: document.getElementById(`input${sectionNum}a`).value,
          indexName: document.getElementById(`input${sectionNum}h`).value, 
          cellNumber: document.getElementById(`input${sectionNum}c`).value,
          qubitConcentration: parseFloat(
            document.getElementById(`input${sectionNum}d`).value,
          ),
          averageSize: parseInt(
            document.getElementById(`input${sectionNum}e`).value,
            10,
          ),
          readsPerCell: parseInt(
            document.getElementById(`input${sectionNum}f`).value,
            10,
          ),
        };
        sectionsData.push(data);
      }
    }
    console.log('Collected sectionsData:', sectionsData);
    displayResults(sectionsData);
  }
  
  function resetForm() {
    // Reset selectedAssayType variable
    selectedAssayType = null;
  
    // Clear all dropdown selections and enable all options
    document.querySelectorAll("select[id^='dropdown']").forEach((select) => {
      select.value = ""; // Reset dropdown selection
      Array.from(select.options).forEach((option) => {
        option.disabled = false; // Enable all options
      });
    });
  
    // Clear all input fields within each section
    document.querySelectorAll(".input-section input").forEach((input) => {
      if (input.type === "text" || input.type === "number") {
        input.value = ""; // Clear text and number inputs
      }
    });
  
    // Hide all info and input sections
    document
      .querySelectorAll(".info-section, .input-section")
      .forEach((section) => {
        section.style.display = "none";
      });
  
    // Optionally clear any displayed results if needed
    const resultsContainer = document.getElementById("results-container");
    if (resultsContainer) {
      resultsContainer.innerHTML = ""; // Clear results display
    }
  
    console.log("Form has been reset.");
  }
  
  function displayResults(sectionsData) {
    //set global correction factor if any section selected is either WTA or targeted
    
    let globalCorrectionFactor = 1;
    function specifyCorrectionFactor(sectionsData) {
    if (!sectionsData) return 1;
    const hasWTA = sectionsData.some((data) => data.assayName === "WTA");
    const hasTargeted = sectionsData.some(
      (data) => data.assayName === "Targeted",
    );
    
    //set global correction factor if any section selected is either WTA or targeted
    if (hasWTA && hasTargeted) {
      globalCorrectionFactor = 5;
    } else if (hasWTA) {
      globalCorrectionFactor = 5;
    } else if (hasTargeted) {
      globalCorrectionFactor = 3;
    } else {globalCorrectionFactor = 1;}
    console.log("Global Correction Factor:", globalCorrectionFactor);
      return globalCorrectionFactor;
  }
  //Change to 1 if the assay is using NovaSeq
  const novaSeqCheckbox = document.getElementById("novaseq");
  novaSeqCheckbox.addEventListener('change', function(){
          if (novaSeqCheckbox.checked) {
            correctionFactor = 1;
          } else {
            correctionFactor = globalCorrectionFactor;
          }
          console.log("Correction factor after asessing if user tick NovaSeqX box", correctionFactor);
        });



  
    //added the mainContent var to allow the displayResult is withitn the main container for sticky footnote
    const mainContent = document.querySelector("main");
    let resultsContainer = document.getElementById("results-container");
  
    if (!resultsContainer) {
      resultsContainer = document.createElement("div");
      resultsContainer.id = "results-container";
      mainContent.appendChild(resultsContainer);
    }
  
    resultsContainer.innerHTML = "<h2>Result Section</h2><p>This section will show an output on how to dilute your Indexed library in preparation to pool them for sequencing. There are THREE main table to pay attention to:<ul><li><b>Input Data Table</b> will listed all the parameters specified by user</li><li><b>Library Dilution Table</b> will specify the amount of Indexed Library and it's Dilution Buffer to achieve the Desired concentration for pooling in (nM).</li><li><b>Per Pooled Library Sequencing Information</b> will specify amount needed for each Indexed library to pool together</li><ul>";
    const instructions = document.createElement("p");
    instructions.innerHTML =
      "This is a section to explain what is in this section. Add instructions, etc.";
    resultsContainer.appendChild(instructions);
  
    // Flex container for sections display
    const flexContainer = document.createElement("div");
    flexContainer.style.display = "flex";
    flexContainer.style.flexWrap = "wrap";
    flexContainer.style.gap = "20px";
  
    sectionsData.forEach((data, index) => {
      const finalLibConc = parseFloat(
        document.getElementById("finalLibConc").value,
      );
      const finalPoolVol = parseFloat(
        document.getElementById("finalPoolVol").value,
      );
  
      if (isNaN(finalLibConc) || isNaN(finalPoolVol)) {
        console.error("finalLibConc or finalPoolVol is not a valid number.");
        return;
      }
  
      console.log(`section${index+1}`);
      console.log(`Assay Name:`, data.assayName);
  
      //correction factor based on assay type
      let globalCorrectionFactor = specifyCorrectionFactor(sectionsData);
      console.log("Line 359 Initial Correction Factor:", globalCorrectionFactor);
  
  
      if (data.assayName === "TCR" || data.assayName === "BCR") {
        if (novaSeqCheckbox.checked){
          correctionFactor = 1;
        } else {
        correctionFactor = globalCorrectionFactor;}
      } else {correctionFactor = 1; }
      console.log("Checks if TCR/BCR Correction Factor Line 368:", correctionFactor);

      //specify the calculation needed to do library dilution factor
      //First calculate the read pairs needed for poooling each library
        const readPairsNeededForPooling = (
          (data.cellNumber * data.readsPerCell * correctionFactor) /1000000);
      console.log(`section ${index + 1} - correction factor used for 
        calculation:`, correctionFactor);
      console.log(`section ${index + 1} - read pairs beeded for
        pooling:`,readPairsNeededForPooling); 
  
      const readsPerCellForPooling = data.readsPerCell * correctionFactor;
      console.log(`section ${index + 1} - reads per cell needed for
        pooling:`,readsPerCellForPooling); 
  
      const totalReadPairsNeededForPooling = sectionsData.reduce((sum, data) => {
      if (data.assayName === "TCR" || data.assayName === "BCR") {
        if (novaSeqCheckbox.checked){
          correctionFactor = 1;
        } else {
        correctionFactor = globalCorrectionFactor;}
      } else {correctionFactor = 1; }
        const readPairs =
          (data.cellNumber * data.readsPerCell * correctionFactor) / 1000000;
        console.log(
          `Adding each sections's Read Pairs needed for pooling to Total: `,
          readPairs,
        );
        return sum + readPairs;
      }, 0);
      console.log(`section${index + 1} - Total read pairs needed for pooling:`, totalReadPairsNeededForPooling);

      const poolingRatio = (readPairsNeededForPooling/
      totalReadPairsNeededForPooling).toFixed(2);
      console.log(`section${index+1}- Pooling Ratio:`,poolingRatio)
      
      let volumeForPooling = (poolingRatio * finalPoolVol).toFixed(2);
      console.log(`sectio${index+1} - volume needed for pooling:`,volumeForPooling);
      const assayType = document.getElementById(`dropdown${index + 1}`).value;
      if (assayType === "SMK") {
        volumeForPooling *= 10;
        console.log(`We times the SMK library volume for pooling by 10 to reduce pipetting error`);
      }
  
      const qubitnMConc = (
        (data.qubitConcentration * 1000000) /
        (660 * data.averageSize)
      ).toFixed(2);
      console.log(
        `section${index + 1} - The Qubit nM concentration:`,
        qubitnMConc,
      );
  
      const indexedLibraryNeededForPooling = ((volumeForPooling* 
        finalLibConc)/qubitnMConc).toFixed(2);
  
      console.log(
        `section${index + 1} - indexed Library Needed For library dilution:`,
        indexedLibraryNeededForPooling,
      );
  
      const elutionBufferVolume = (
        volumeForPooling - indexedLibraryNeededForPooling
      ).toFixed(2);
      console.log(
        `section${index + 1} - elution buffer needed for library dilution:`,
        elutionBufferVolume,
      );

      data.readPairsNeededForPooling=readPairsNeededForPooling;
      data.correctionFactor=correctionFactor;
      data.readsPerCellForPooling = readsPerCellForPooling;
      data.volumeForPooling = volumeForPooling; 
      data.qubitnMConc = qubitnMConc; 
      data.indexedLibraryNeededForPooling = indexedLibraryNeededForPooling; 
      data.elutionBufferVolume = elutionBufferVolume; 
        
      console.log('Calculated sectionsData:', sectionsData);
  
      //calculating the last main table
  
      // Outer section container with specific width
      const sectionContainer = document.createElement("div");
      sectionContainer.style.width = "100%"; // Full width for the section container
      sectionContainer.style.margin = "10px 15px 0 15px";
      sectionContainer.style.padding = "5px";
  
      // Title for each section
      const sectionTitle = document.createElement("h4");
      sectionTitle.style.padding = "5px 15px 5px 15px";
      sectionTitle.textContent = (`Assay: ${data.assayName}`);
      sectionContainer.appendChild(sectionTitle);
  
      // Inner flex container for side-by-side table display
      const tableFlexContainer = document.createElement("div");
      tableFlexContainer.style.display = "flex";
      tableFlexContainer.style.width = "80%";
      tableFlexContainer.style.gap = "5px"; // Space between tables
      tableFlexContainer.style.justifyContent = "space-between";
  
      // Input Data table
      const sectionTable1 = document.createElement("table");
      sectionTable1.style.width = "48%"; // Adjust as needed
      sectionTable1.style.textAlign="left";
      sectionTable1.style.borderCollapse="collapse";
      sectionTable1.innerHTML = `
        <caption>Input Data</caption>
        <tr><th>Library Name</th><td>${data.libraryName}</td></tr>
        <tr><th>Index Name i7</th><td>${data.indexName}</td></tr>
        <tr><th>Index Sequence i7</th><td>${data.indexPrimer}</td></tr>
        <tr><th>Cell Number</th><td>${data.cellNumber}</td></tr>
        <tr><th>Qubit Concentration (ng/&microl)</th><td>${data.qubitConcentration}</td></tr>
        <tr><th>Average Size (bp)</th><td>${data.averageSize}</td></tr>
        <tr><th>Reads Per Cell</th><td>${data.readsPerCell}</td></tr>
        <tr><th>Read Per Cell for pooling</th><td>${data.readsPerCellForPooling}</td></tr>
      `;
  
      const sectionTable2 = document.createElement("table");
      sectionTable2.style.width = "48%";
      sectionTable2.style.textAlign="left";
      sectionTable2.innerHTML = `
        <caption>Library Dilution</caption>
        <table border="1">
        <tr><th>Indexed Library Volume (&microL)</th><td>${data.indexedLibraryNeededForPooling}</td></tr>
        <tr><th>Elution Buffer Volume (&microL)</th><td>${data.elutionBufferVolume}</td></tr>
        <tr><th>Total Volume (&microL)</th><td>${data.volumeForPooling}</td></tr>
        <tr><th>Library Concentration (nM)</th>
        <td>${finalLibConc}</td></tr>`;
  
      // Append tables to inner flex container
      tableFlexContainer.appendChild(sectionTable1);
      tableFlexContainer.appendChild(sectionTable2);
  
      // Append inner flex container to outer section container
      sectionContainer.appendChild(tableFlexContainer);
      flexContainer.appendChild(sectionContainer);

      resultsContainer.appendChild(flexContainer);

        
  });

  //create the final table for sequencing summary and display the table used in seq calculator
  let globalPhix = 1; 
  function specifyPhixPercentage(sectionsData){
    const hasWTA = sectionsData.some((data) => data.assayName === "WTA");
    const hasSMK = sectionsData.some((data) => data.assayName === "SMK");
    const hasAbSeq = sectionsData.some((data) => data.assayName === "AbSeq");
    const hasVDJ = sectionsData.some((data) => data.assayName === "TCR"||data.assayName === "BCR");
    const hasTargeted = sectionsData.some((data) => data.assayName === "Targeted");

    if (hasWTA && hasAbSeq && hasSMK){globalPhix = 1;}
    else if (hasWTA && hasVDJ){globalPhix = 3;}
    else if (hasTargeted && hasVDJ){globalPhix = 3;}
    else if (hasAbSeq && hasVDJ){globalPhix = 15;}
    else if (hasAbSeq){globalPhix = 15;}
    else if (hasVDJ){globalPhix = 15;}
    else{globalPhix = 1;}
    
    console.log("screen all assay combination: Phix is", globalPhix);
    return globalPhix;
  }

  const recommendation = document.createElement("p");
  recommendation.style.margin = "5px 10px 5px 10px";
  recommendation.innerHTML = `<h2>Pooling your indexed libraries</h2> <p>Please follow the table below to combined all your indexed library in one tube. This is the tube that will be sent to your sequencing provider.</p>`;

  const sequencingTable = document.createElement("table");
  sequencingTable.style.margin = "15px";

  sequencingTable.innerHTML = `
  <caption>Per pooled library sequencing information</caption>
  <tr>
  <th>Library</th>
  <th>Diluted library volume (&microL)</th>
  <th> Read pairs Needed for Sequencing (Millions)</th>
  </tr>`;

  sectionsData.forEach((data, index) => {
    const readPairsForSequencing =
      (data.cellNumber * data.readsPerCell) / 1000000;

    sequencingTable.innerHTML += `
    <tr>
    <td>${data.libraryName || `Library ${index + 1}`}</td>
    <td>${data.volumeForPooling}</td>
    <td>${readPairsForSequencing}</td>
    </tr>`;
  });

  const totalReadPairsForSequencing = sectionsData.reduce((sum, data) => {
    const cellNumber = data.cellNumber;
    const readsPerCell = data.readsPerCell;
    const readPairsSequencing = (cellNumber * readsPerCell) / 1000000;
    console.log(
      `Adding each sections's Read Pairs for sequencing to Total: `,
      readPairsSequencing,
    );
    return sum + readPairsSequencing;
  }, 0);

  let phixValue = specifyPhixPercentage(sectionsData);
  console.log(`PhiX percentage for sequencing`, phixValue);
  const phixForSequencing = (phixValue/100)*totalReadPairsForSequencing;

  const newRow1 = sequencingTable.insertRow();
  const newRow2 = sequencingTable.insertRow();
  const newRow3 = sequencingTable.insertRow();
  newRow1.innerHTML = `<td colspan="3"><strong>Total read pairs for sequencing: ${totalReadPairsForSequencing} (Millions)</strong></td>`;
  newRow2.innerHTML = `<td colspan="3"><strong>Percentage Phix for Sequencing: ${phixValue}% </strong></td>`;
  newRow3.innerHTML = `<td colspan="3"><strong>Total phix for sequencing: ${phixForSequencing} (Millions)</strong></td>`;

  resultsContainer.appendChild(sequencingTable);

  const sequencer = document.createElement("p");
  sequencer.style.margin= "5px";
  sequencer.innerHTML = `<h2>Recommendation: Sequencer, kits, PhiX, loading concentration </h2>`;

  let sequencerTable;
    sequencerTable = document.createElement("table");
    sequencerTable.style.margin = "15px";
    sequencerTable.innerHTML = `
    <thead>
    <tr>
    <th>Illumina Sequencing Platform and Kit</th>
    <th>Cycle Kit</th> 
    <th>Million Read Pairs</th>
    <th>Recommended loading concentration</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>Miniseq Mid Output</td>
    <td>300</td>
    <td>7</td>
    <td>1.4-1.8pM</td>
    </tr>
    <tr>
    <td>Miseq Reagent kit v2</td>
    <td>300, 500</td>
    <td>12</td>
    <td>contact local FAS</td>
    </tr>
    <tr>
    <td>Miniseq High Output</td>
    <td>150, 300</td>
    <td>22</td>
    <td>1.4-1.8pM</td>
    </tr>
    <tr>
    <td>Miseq Reagent kit v3</td>
    <td>150, 600</td>
    <td>22</td>
    <td>contact local FAS</td>
    </tr>
    <tr>
    <td>NextSeq 1000/2000 P1</td>
    <td>300</td>
    <td>100</td>
    <td>contact local FAS</td>
    </tr>
    <tr>
    <td>NextSeq 550 Mid Output</td>
    <td>150, 300</td>
    <td>130</td>
    <td>1.4-1.8pM</td>
    </tr>
    <tr>
    <td>HiSeq 4000 (Single Lane)</td>
    <td>150, 300</td>
    <td>313</td>
    <td>contact local FAS</td>
    </tr>
    <tr>
    <td>NovaSeq 6000 S Prime (Single Lane)</td>
    <td>100, 200, 300, 500 ***</td>
    <td>325</td>
    <td>180-250pM (XP workflow)</td>
    </tr>
    <tr>
    <td>NextSeq 550 High Output</td>
    <td>150, 300</td>
    <td>400</td>
    <td>1.4-1.8pM</td>
    </tr>
    <tr>
    <td>NextSeq 1000/2000 P2</td>
    <td>200, 300</td>
    <td>400</td>
    <td>contact local FAS</td>
    </tr>
    <tr>
    <td>NovaSeq 6000 S Prime (Single Flow Cell)</td>
    <td>100, 200, 300, 500 ***</td>
    <td>650</td>
    <td>350-650 pM (standard workflow)</td>
    </tr>
    <tr>
    <td>NovaSeq 6000 S1 (Single Lane)</td>
    <td>100, 200, 500 ***</td>
    <td>650</td>
    <td>180-250pM (XP workflow)</td>
    </tr>
    <tr>
    <td>NextSeq 2000 P3</td>
    <td>200, 300</td>
    <td>1200</td>
    <td>contact local FAS</td>
    </tr>
    <tr>
    <td>NovaSeq 6000 S1 (Single Flow Cell)</td>
    <td>100, 200, 300 ***</td>
    <td>1300</td>
    <td>350-650 pM (standard workflow)</td>
    </tr>
    <tr>
    <td>NovaSeq 6000 S4 (Single Lane)</td>
    <td>200, 300</td>
    <td>2000</td>
    <td>180-250pM (XP workflow)</td>
    </tr>
    <tr>
    <td>HiSeq 4000 (Single Flow Cell)</td>
    <td>150, 300</td>
    <td>2500</td>
    <td>contact local FAS</td>
    </tr>
    <tr>
    <td>NovaSeq 6000 S2 (Single Flow Cell)</td>
    <td>100, 200, 300 ***</td>
    <td>3300</td>
    <td>350-650 pM (standard workflow)</td>
    </tr>
    <tr>
    <td>NovaSeq 6000 S4 (Single Flow Cell)</td>
    <td>200, 300</td>
    <td>8000</td>
    <td>350-650 pM (standard workflow)</td>
    </tr>
    <tr>
    <td>NovaSeq X 10B</td>
    <td>200, 300</td>
    <td>10000</td>
    <td>contact local FAS</td>
    </tr>
    </tbody>`;

  //////////filter the table

  function filterTableByValue(threshold) {
    const table = sequencerTable;
    const rows = table.getElementsByTagName("tr");
  
    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
      const cells = rows[i].getElementsByTagName("td");
      const value = parseInt(cells[2].innerText); //value is in the third column
      console.log(`value for table:`, value);
  
      if (value > threshold) {
        rows[i].style.display = ""; // Show the row
      } else {
        rows[i].style.display = "none"; // Hide the row
      }
    }
  }
  // Example usage: Display rows with values greater than 15
  console.log(`sequencing recommendation table value:`,totalReadPairsForSequencing);
  let value = totalReadPairsForSequencing
  filterTableByValue(value);

  resultsContainer.appendChild(recommendation);
  resultsContainer.appendChild(sequencingTable);

  resultsContainer.appendChild(sequencer);
  resultsContainer.appendChild(sequencerTable);

  
    resultsContainer.scrollIntoView({ behavior: "smooth", block: "end" });
  
    // Add an input field for the user to specify the PDF name
    const pdfNameInput = document.createElement("input");
    pdfNameInput.type = "text";
    pdfNameInput.id = "pdfName";
    pdfNameInput.placeholder = "Enter file name";
    pdfNameInput.style.marginRight = "10px";
  
    // Add "Save as PDF" button below the last table
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save as PDF";
    saveButton.onclick = saveAsPDF;
  
    // Append input field and button to resultsContainer
    resultsContainer.appendChild(pdfNameInput);
    resultsContainer.appendChild(saveButton);
  
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
  
      // Capture the container as a canvas
      await html2canvas(resultsContainer, {
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
  
        // Calculate the custom dimensions based on the image size
        const imgWidth = canvas.width / 2; // Scale down if necessary
        const imgHeight = canvas.height / 2;
        const pdfWidth = imgWidth + 2 * margin;
        const pdfHeight = imgHeight + headerHeight + footerHeight + 2 * margin;
  
        // Create a PDF with a custom page size
        const pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight]);
  
        // Header text
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        const timeString = currentDate.toLocaleTimeString();
        const projectName =
          document.getElementById("project_name")?.value || "not specified";
        const userName =
          document.getElementById("userName")?.value || "not specified";
  
        pdf.setFontSize(10);
        pdf.text(`Date: ${dateString} | Time: ${timeString}`, margin, 20);
        pdf.text(`Project Name: ${projectName}`, margin, 30);
        pdf.text(`UserName: ${userName}`, margin, 40);
  
        // Insert image
        const imgY = headerHeight + margin;
        pdf.addImage(imgData, "PNG", margin, imgY, imgWidth, imgHeight);
  
        // Footer text immediately after the image
        const footerY = imgY + imgHeight + 10;
        const emailNote =
          "This is an initial release for our Sequencing Calculator. Please contact syabira.yusoff@bd.com if you have any comments, improvement or any details are not clear from the Sequencing calculator";
        const wrappedText = pdf.splitTextToSize(emailNote, pdfWidth - 2 * margin);
        pdf.text(wrappedText, margin, footerY);
  
        // Save the PDF with the specified file name or default to "results.pdf"
        const fileName = pdfNameInput.value || "results";
        pdf.save(`${fileName}.pdf`);
      });
  
      // Restore visibility of the input and save button
      pdfNameInput.style.display = "inline";
      saveButton.style.display = "inline";
    }
  }
  
  createSections();
  