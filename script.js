// PVQ Questions
const questions = [
    "Thinking up new ideas and being creative is important to him. He likes to do things in his own original way.",
    "It is important to him to be rich. He wants to have a lot of money and expensive things.",
    "He thinks it is important that every person in the world be treated equally. He believes everyone should have equal opportunities in life.",
    "It's very important to him to show his abilities. He wants people to admire what he does.",
    "It is important to him to live in secure surroundings. He avoids anything that might endanger his safety.",
    "He thinks it is important to do lots of different things in life. He always looks for new things to try.",
    "He believes that people should do what they're told. He thinks people should follow rules at all times, even when no one is watching.",
    "It is important to him to listen to people who are different from him. Even when he disagrees with them, he still wants to understand them.",
    "He thinks it's important not to ask for more than what you have. He believes that people should be satisfied with what they have.",
    "He seeks every chance he can to have fun. It is important to him to do things that give him pleasure.",
    "It is important to him to make his own decisions about what he does. He likes to be free to plan and to choose his activities for himself.",
    "It's very important to him to help the people around him. He wants to care for their well-being.",
    "Being very successful is important to him. He likes to impress other people.",
    "It is very important to him that his country be safe. He thinks the state must be on watch against threats from within and without.",
    "He likes to take risks. He is always looking for adventures.",
    "It is important to him to always behave properly. He wants to avoid doing anything people would say is wrong.",
    "It is important to him to be in charge and tell others what to do. He wants people to do what he says.",
    "It is important to him to be loyal to his friends. He wants to devote himself to people close to him.",
    "He strongly believes that people should care for nature.",
    "Religious belief is important to him. He tries hard to do what his religion requires.",
    "It is important to him that things be organized and clean. He really does not like things to be a mess.",
    "He thinks it's important to be interested in things. He likes to be curious and to try to understand all sorts of things.",
    "He believes all the world's people should live in harmony. Promoting peace among all groups in the world is important to him.",
    "He thinks it is important to be ambitious. He wants to show how capable he is.",
    "He thinks it is best to do things in traditional ways. It is important to him to keep up the customs he has learned.",
    "Enjoying life's pleasures is important to him. He likes to spoil himself.",
    "It is important to him to respond to the needs of others. He tries to support those he knows.",
    "He believes he should always show respect to his parents and to older people. It is important to him to be obedient.",
    "He wants everyone to be treated justly, even people he doesn't know. It is important to him to protect the weak in society.",
    "He likes surprises. It is important to him to have an exciting life.",
    "He tries hard to avoid getting sick. Staying healthy is very important to him.",
    "Getting ahead in life is important to him. He strives to do better than others.",
    "Forgiving people who have hurt him is important to him. He tries to see what is good in them and not to hold a grudge.",
    "It is important to him to be independent. He likes to rely on himself.",
    "Having a stable government is important to him. He is concerned that the social order be protected.",
    "It is important to him to be polite to other people all the time. He tries never to disturb or irritate others.",
    "He really wants to enjoy life. Having a good time is very important to him.",
    "It is important to him to be humble and modest. He tries not to draw attention to himself.",
    "He always wants to be the one who makes the decisions. He likes to be the leader.",
    "It is important to him to adapt to nature and to fit into it. He believes that people should not change nature."
];

// Value categories
const valueCategories = [
    "Self-transcendence",
    "Conservation",
    "Self-enhancement",
    "Openness to change"
];

// Likert scale options
const likertOptions = [
    { value: 6, label: "Very much like me" },
    { value: 5, label: "Like me" },
    { value: 4, label: "Somewhat like me" },
    { value: 3, label: "A little like me" },
    { value: 2, label: "Not like me" },
    { value: 1, label: "Not like me at all" }
];

// DOM Elements
const welcomePage = document.getElementById('welcome-page');
const questionnairePage = document.getElementById('questionnaire-page');
const resultsPage = document.getElementById('results-page');
const valuesInfoPage = document.getElementById('values-info-page');
const startButton = document.getElementById('start-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const downloadPdfButton = document.getElementById('download-pdf-button');
const knowValuesButton = document.getElementById('know-values-button');
const backToResultsButton = document.getElementById('back-to-results-button');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const questionText = document.getElementById('question-text');
const likertScale = document.getElementById('likert-scale');
const chartContainer = document.getElementById('chart-container');
const interpretations = document.getElementById('interpretations');

// State variables
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let chart = null;
let currentScores = null;

// Initialize the questionnaire
function init() {
    showPage(welcomePage);
    updateProgress();
    
    // Add event listener for download button
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', function() {
            console.log('Download button clicked');
            downloadResultsAsPDF();
        });
    }
}

// Show a specific page and hide others
function showPage(page) {
    [welcomePage, questionnairePage, resultsPage, valuesInfoPage].forEach(p => p.classList.remove('active'));
    page.classList.add('active');
}

// Update progress bar and text
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

// Display current question
function displayQuestion() {
    questionText.textContent = questions[currentQuestion];
    updateProgress();
    
    // Update button states
    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = answers[currentQuestion] === null;
    
    // Highlight selected option if exists
    const options = document.querySelectorAll('.likert-option');
    options.forEach(option => {
        option.classList.remove('selected');
        if (option.querySelector('input').value == answers[currentQuestion]) {
            option.classList.add('selected');
        }
    });
}

// Create Likert scale options
function createLikertScale() {
    likertScale.innerHTML = '';
    likertOptions.forEach(option => {
        const div = document.createElement('div');
        div.className = 'likert-option';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'likert';
        input.value = option.value;
        input.id = `option-${option.value}`;
        
        const label = document.createElement('label');
        label.htmlFor = `option-${option.value}`;
        label.textContent = option.label;
        
        div.appendChild(input);
        div.appendChild(label);
        likertScale.appendChild(div);
        
        // Add click handler
        div.addEventListener('click', () => selectOption(option.value));
    });
}

// Handle option selection
function selectOption(value) {
    answers[currentQuestion] = value;
    displayQuestion();
}

// Calculate results
function calculateResults() {
    // This is a simplified scoring system
    // In a real implementation, you would use the official PVQ scoring algorithm
    const scores = {
        "Self-transcendence": 0,
        "Conservation": 0,
        "Self-enhancement": 0,
        "Openness to change": 0
    };
    
    // Example scoring (simplified)
    // Self-transcendence: questions 3, 8, 9, 12, 18, 19, 23, 29, 33, 38, 40
    const selfTranscendenceIndices = [2, 7, 8, 11, 17, 18, 22, 28, 32, 37, 39];
    scores["Self-transcendence"] = selfTranscendenceIndices.reduce((sum, idx) => sum + answers[idx], 0) / selfTranscendenceIndices.length;
    
    // Conservation: questions 5, 7, 16, 20, 21, 25, 28, 31, 35, 36
    const conservationIndices = [4, 6, 15, 19, 20, 24, 27, 30, 34, 35];
    scores["Conservation"] = conservationIndices.reduce((sum, idx) => sum + answers[idx], 0) / conservationIndices.length;
    
    // Self-enhancement: questions 2, 4, 13, 17, 24, 32, 39
    const selfEnhancementIndices = [1, 3, 12, 16, 23, 31, 38];
    scores["Self-enhancement"] = selfEnhancementIndices.reduce((sum, idx) => sum + answers[idx], 0) / selfEnhancementIndices.length;
    
    // Openness to change: questions 1, 6, 10, 11, 15, 22, 30, 34
    const opennessIndices = [0, 5, 9, 10, 14, 21, 29, 33];
    scores["Openness to change"] = opennessIndices.reduce((sum, idx) => sum + answers[idx], 0) / opennessIndices.length;
    
    return scores;
}

// Display results
function displayResults() {
    const scores = calculateResults();
    currentScores = scores;
    
    // Create chart
    if (chart) {
        chart.destroy();
    }
    
    const ctx = document.createElement('canvas');
    chartContainer.innerHTML = '';
    chartContainer.appendChild(ctx);
    
    chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: valueCategories,
            datasets: [{
                label: 'Your Values Profile',
                data: Object.values(scores),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 6
                }
            }
        }
    });
    
    // Display scores table
    const scoresTable = document.createElement('div');
    scoresTable.className = 'scores-table';
    scoresTable.innerHTML = `
        <h3>Your Value Scores</h3>
        <table>
            <thead>
                <tr>
                    <th>Value Category</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(scores).map(([category, score]) => `
                    <tr>
                        <td>${category}</td>
                        <td>${score.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Insert scores table before interpretations
    interpretations.innerHTML = '';
    interpretations.appendChild(scoresTable);
    
    // Display interpretations
    Object.entries(scores).forEach(([category, score]) => {
        const div = document.createElement('div');
        div.className = 'interpretation';
        
        const h3 = document.createElement('h3');
        h3.textContent = category;
        
        const p = document.createElement('p');
        p.textContent = getInterpretation(category, score);
        
        div.appendChild(h3);
        div.appendChild(p);
        interpretations.appendChild(div);
    });
}

// Get interpretation text based on score
function getInterpretation(category, score) {
    if (score >= 5) {
        return `You have a very strong orientation towards ${category.toLowerCase()}. This value is highly important in guiding your decisions and actions.`;
    } else if (score >= 4) {
        return `You have a moderate to strong orientation towards ${category.toLowerCase()}. This value plays an important role in your life.`;
    } else if (score >= 3) {
        return `You have a moderate orientation towards ${category.toLowerCase()}. This value is somewhat important to you.`;
    } else {
        return `You have a relatively weak orientation towards ${category.toLowerCase()}. This value is not a primary driver in your life.`;
    }
}

// Generate and download PDF
function downloadResultsAsPDF() {
    if (!currentScores) {
        console.error('No results available to download');
        return;
    }
    
    console.log('Starting PDF generation...');
    
    // Create a temporary container for the PDF content
    const pdfContainer = document.createElement('div');
    pdfContainer.style.width = '800px';
    pdfContainer.style.padding = '20px';
    pdfContainer.style.backgroundColor = 'white';
    
    // Add title
    const title = document.createElement('h1');
    title.textContent = 'Portrait Values Questionnaire (PVQ) Results';
    title.style.textAlign = 'center';
    title.style.color = '#2c3e50';
    title.style.marginBottom = '20px';
    pdfContainer.appendChild(title);
    
    // Add date
    const date = document.createElement('p');
    date.textContent = `Date: ${new Date().toLocaleDateString()}`;
    date.style.textAlign = 'right';
    date.style.marginBottom = '20px';
    pdfContainer.appendChild(date);
    
    // Add chart
    const chartCanvas = document.createElement('canvas');
    chartCanvas.width = 600;
    chartCanvas.height = 400;
    const chartCtx = chartCanvas.getContext('2d');
    
    // Clone the chart
    new Chart(chartCtx, {
        type: 'radar',
        data: chart.data,
        options: {
            ...chart.options,
            animation: false,
            responsive: false
        }
    });
    
    const chartDiv = document.createElement('div');
    chartDiv.style.textAlign = 'center';
    chartDiv.style.marginBottom = '30px';
    chartDiv.appendChild(chartCanvas);
    pdfContainer.appendChild(chartDiv);
    
    // Add scores table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '30px';
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const th1 = document.createElement('th');
    th1.textContent = 'Value Category';
    th1.style.padding = '10px';
    th1.style.borderBottom = '2px solid #3498db';
    th1.style.textAlign = 'left';
    
    const th2 = document.createElement('th');
    th2.textContent = 'Score';
    th2.style.padding = '10px';
    th2.style.borderBottom = '2px solid #3498db';
    th2.style.textAlign = 'center';
    
    const th3 = document.createElement('th');
    th3.textContent = 'Interpretation';
    th3.style.padding = '10px';
    th3.style.borderBottom = '2px solid #3498db';
    th3.style.textAlign = 'left';
    
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    headerRow.appendChild(th3);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    
    Object.entries(currentScores).forEach(([category, score]) => {
        const row = document.createElement('tr');
        
        const td1 = document.createElement('td');
        td1.textContent = category;
        td1.style.padding = '10px';
        td1.style.borderBottom = '1px solid #eee';
        
        const td2 = document.createElement('td');
        td2.textContent = score.toFixed(2);
        td2.style.padding = '10px';
        td2.style.borderBottom = '1px solid #eee';
        td2.style.textAlign = 'center';
        
        const td3 = document.createElement('td');
        td3.textContent = getInterpretation(category, score);
        td3.style.padding = '10px';
        td3.style.borderBottom = '1px solid #eee';
        
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    pdfContainer.appendChild(table);
    
    // Add footer
    const footer = document.createElement('p');
    footer.textContent = 'This report was generated by the Portrait Values Questionnaire (PVQ).';
    footer.style.textAlign = 'center';
    footer.style.fontSize = '12px';
    footer.style.color = '#666';
    footer.style.marginTop = '30px';
    pdfContainer.appendChild(footer);
    
    // Append to body temporarily
    document.body.appendChild(pdfContainer);
    
    console.log('Container created, generating PDF...');
    
    // Generate PDF
    html2canvas(pdfContainer).then(canvas => {
        console.log('Canvas created, converting to PDF...');
        const imgData = canvas.toDataURL('image/png');
        
        // Create PDF using the global jsPDF object
        const pdf = new window.jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('PVQ_Results.pdf');
        
        console.log('PDF saved successfully');
        
        // Remove temporary container
        document.body.removeChild(pdfContainer);
    }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('There was an error generating the PDF. Please try again.');
        document.body.removeChild(pdfContainer);
    });
}

// Show Values Information Page
function showValuesInfoPage() {
    welcomePage.classList.remove('active');
    questionnairePage.classList.remove('active');
    resultsPage.classList.remove('active');
    valuesInfoPage.classList.add('active');
}

// Show Results Page
function showResultsPage() {
    welcomePage.classList.remove('active');
    questionnairePage.classList.remove('active');
    valuesInfoPage.classList.remove('active');
    resultsPage.classList.add('active');
}

// Event Listeners
startButton.addEventListener('click', () => {
    showPage(questionnairePage);
    createLikertScale();
    displayQuestion();
});

prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showPage(resultsPage);
        displayResults();
    }
});

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    answers = new Array(questions.length).fill(null);
    showPage(welcomePage);
});

downloadPdfButton.addEventListener('click', downloadResultsAsPDF);
knowValuesButton.addEventListener('click', showValuesInfoPage);
backToResultsButton.addEventListener('click', showResultsPage);

// Initialize the questionnaire
init(); 