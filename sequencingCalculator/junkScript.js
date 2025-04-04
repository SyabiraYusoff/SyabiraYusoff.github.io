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