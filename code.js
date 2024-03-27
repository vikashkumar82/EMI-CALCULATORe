
// var abc=document.getElementById("cars").value;
// alert(abc);

// format textbox for home loan
function formatNumber() {
  var inputElement = document.getElementById("homeLoanAmount");
  var inputValue = inputElement.value.replace(/,/g, "");
  var formattedValue = Number(inputValue).toLocaleString();
  inputElement.value = formattedValue;
}

// Home loan Slider
var loanAmountSlider = document.getElementById("homeLoanAmountSlider");
var loanAmountOutput = document.getElementById("homeLoanAmount");
loanAmountOutput.value = formatNumberWithCommas(loanAmountSlider.value);

loanAmountSlider.oninput = function () {
  loanAmountOutput.value = formatNumberWithCommas(this.value);
};

// Interest Rate slider
var slider = document.getElementById("homeLoanintrestSlider");
var output = document.getElementById("homeInterestRate");

// Initialize the textbox with the default slider value
updateTextboxValue(parseFloat(slider.value));

// Update the textbox value each time you drag the slider handle
slider.oninput = function() {
    updateTextboxValue(parseFloat(this.value));
}

function updateTextboxValue(value) {
    if (Number.isInteger(value)) {
        output.value = value.toFixed(0);
    } else {
        output.value = value.toFixed(2);
    }
}

function formatNumberWithCommas(x) {
  var numStr = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(numStr)) {
    numStr = numStr.replace(pattern, "$1,$2");
  }
  return numStr;
}

// Loan tenure slider
const tenureRange = document.getElementById("homeLoanTenureSlider");
const tenureInputBox = document.getElementById("homeLoanTenure");
const yearChecked = document.getElementById("yearChecked");
const monthChecked = document.getElementById("monthChecked");

if (yearChecked.checked) {
  setupYearTenure();
} else {
  setupMonthTenure();
}


// Event listener for tenure type change
yearChecked.addEventListener('change', setupYearTenure);
monthChecked.addEventListener('change', setupMonthTenure);

function setupYearTenure() {
  tenureRange.setAttribute('min', '1');
  tenureRange.setAttribute('max', '30');
  tenureRange.setAttribute('value', '5');
  tenureInputBox.value = tenureRange.value;

  function updateValue() {
    tenureInputBox.value = tenureRange.value;
  }
// Remove any existing event listeners to avoid duplicates
tenureRange.removeEventListener('input', updateValue);

// Add the updated event listener
tenureRange.addEventListener('input', updateValue);
}

// Function to set up tenure for months
function setupMonthTenure() {
tenureRange.setAttribute('min', '1');
tenureRange.setAttribute('max', '360');
tenureRange.setAttribute('value', '12');
tenureInputBox.value = tenureRange.value;

function updateValue() {
  tenureInputBox.value = tenureRange.value;
}

// Remove any existing event listeners to avoid duplicates
tenureRange.removeEventListener('input', updateValue);

// Add the updated event listener
tenureRange.addEventListener('input', updateValue);
}

// ---------------------------------------------------------------------------------------------------



document.addEventListener('DOMContentLoaded', function() {
  const carsSelect = document.getElementById('cars');
  const usdDollarResult = document.getElementById('usdDollarResult');
  const inrRupeeResult = document.getElementById('inrRupeeResult');
  const toggleButton = document.getElementById('toggleButton');

  function toggleResultSections(selectedOption) {
      if (selectedOption === 'he') {
          usdDollarResult.style.display = 'block';
          inrRupeeResult.style.display = 'none';
      } else if (selectedOption === 'saab') {
          usdDollarResult.style.display = 'none';
          inrRupeeResult.style.display = 'block';
      }
  }

  // Event listener for the dropdown change
  carsSelect.addEventListener('change', function() {
      toggleResultSections(this.value);
  });

  // Initial display based on the default dropdown value
  toggleResultSections(carsSelect.value);

  // Optional: Button click listener to perform the same action (can be removed if not needed)
  toggleButton.addEventListener('click', function() {
      toggleResultSections(carsSelect.value);
  });
});


function calculateEMI() {

document.getElementById("homePieChartResult").style.display="block";
  
      // Ensure all input elements exist and are correctly referenced.
      var loanAmountElement = document.getElementById("homeLoanAmount");
      var interestRateElement = document.getElementById("homeInterestRate");
      var tenureElement = document.getElementById("homeLoanTenure");
      var tenureTypeElement = document.querySelector('input[name="tenureType"]:checked');
  
      // Check if inputs are not null or undefined.
      if (!loanAmountElement || !interestRateElement || !tenureElement || !tenureTypeElement) {
          alert("Please make sure all fields are filled out correctly.");
          return;
      }
  
      // Parse input values.
      var loanAmount = parseFloat(loanAmountElement.value.replace(/,/g, ''));
      var interestRate = parseFloat(interestRateElement.value);
      var tenure = parseFloat(tenureElement.value);
      var tenureType = tenureTypeElement.id;
  
      // Basic input validation.
      if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(tenure)) {
          alert("Invalid input. Please enter numeric values for loan amount, interest rate, and tenure.");
          return;
      }
  
      // Convert interest rate into a monthly percentage.
      var monthlyInterestRate = interestRate / 12 / 100;
  
      // Convert tenure to months if it is in years.
      var tenureMonths = tenureType === 'yearChecked' ? tenure * 12 : tenure;
  
      // Calculate EMI.
      var emi = loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenureMonths) / (Math.pow((1 + monthlyInterestRate), tenureMonths) - 1);
      
      // Handle division by zero if interest rate is 0.
      if (!isFinite(emi)) {
          alert("The calculation resulted in an invalid number. Please check the interest rate.");
          return;
      }
  
      // Calculate total payment and interest.
      var totalPayment = emi * tenureMonths;
      var totalInterestPayable = totalPayment - loanAmount;
  
      // Update the results.
      document.getElementById("homeEmiResult").innerText = emi.toFixed(2);
      document.getElementById("homeTotalInterestResult").innerText = totalInterestPayable.toFixed(2);
      document.getElementById("homeTotalPaymentResult").innerText = totalPayment.toFixed(2);



// rupee to dollar
var homeDollarEmi = emi.toFixed(2);
var homeDollarintrest = totalInterestPayable.toFixed(2);
var homeDollarTotalPayment = totalPayment.toFixed(2);

var hd1= homeDollarEmi/82.92;
var hd2= homeDollarintrest/82.92;
var hd3= homeDollarTotalPayment/82.92;


document.getElementById("rupeeLoanEmi").innerText=hd1.toFixed(2)
document.getElementById("rupeeIntrestEmi").innerText=hd2.toFixed(2)
document.getElementById("rupeeTotalEmi").innerText=hd3.toFixed(2)


// dollar to rupee

var homeRupeeEmi = emi.toFixed(2);
var homeRupeeIntrest = totalInterestPayable.toFixed(2);
var homeRupeeTotalPayment = totalPayment.toFixed(2);


var hr1= homeRupeeEmi*82.92;
var hr2= homeRupeeIntrest*82.92;
var hr3= homeRupeeTotalPayment*82.92;


document.getElementById("dollarLoanEmi").innerText=hr1.toFixed(2);
document.getElementById("dollarIntrestEmi").innerText=hr2.toFixed(2);
document.getElementById("dollarTotalEmi").innerText=hr3.toFixed(2);
      




      
// Chart
async function simplePieChart(divElementId) {

  // ------------------------------------------------------------------------------
  
    // Get input values
    var loanAmount = parseFloat(document.getElementById("homeLoanAmount").value);
    var interestRate = parseFloat(document.getElementById("homeInterestRate").value);
    var loanTenure = parseFloat(document.getElementById("homeLoanTenure").value);
  
    // Calculate monthly interest rate and number of payments
    var monthlyInterestRate = interestRate / 12 / 100;
    var numberOfPayments = loanTenure * 12;
  
    // Calculate monthly payment
    var monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    
    // Calculate total payment and total interest
    var totalPayment = monthlyPayment * numberOfPayments;
    var totalInterest = totalPayment - loanAmount;
  
    // Calculate percentages
    var interestPercentage = (totalInterest / totalPayment) * 100;
    var principalPercentage = 100 - interestPercentage;
  
    // Display results
  
    var b = principalPercentage.toFixed(2) + '%';
    var c = interestPercentage.toFixed(2) + '%';
  

    // ------------------------------------------------------------------------------
  
      // #region ExampleA
      // Demonstrates how to create a pie chart with SciChart.js
      const {
        SciChartPieSurface,
        EPieType,
        SciChartJsNavyTheme,
        PieSegment,
        ELegendPlacement,
        ELegendOrientation,
        GradientParams,
        Point
      } = SciChart;
    
      // or, for npm, import { SciChartPieSurface, ... } from "scichart"
    
      // Create the pie chart
      const sciChartPieSurface = await SciChartPieSurface.create(divElementId, {
        theme: new SciChartJsNavyTheme(),
        pieType: EPieType.Pie,
        animate: true,
      });
    
      // Additional legend options
      sciChartPieSurface.legend.showLegend = true;
      sciChartPieSurface.legend.showCheckboxes = true;
      sciChartPieSurface.legend.animate = true;
      sciChartPieSurface.legend.placement = ELegendPlacement.TopRight;
      sciChartPieSurface.legend.orientation = ELegendOrientation.Vertical;
    
      // Create pie segments with value, colour and text
      const pieSegment1 = new PieSegment({
        color: "#5633CF",
        value: parseFloat(b.replace('%', '')),
        text: "Principal Loan Amount",
        colorLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
          { color: "#5633CF", offset: 0 },
          { color: "#5633CF", offset: 1 },
        ]),
      });
      const pieSegment2 = new PieSegment({
        value:parseFloat(c.replace('%', '')),
        text: "Total Interest",
        colorLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
          { color: "#FF9933", offset: 0 },
          { color: "#FF9933", offset: 1 },
        ]),
      });
     
      sciChartPieSurface.pieSegments.add(pieSegment1, pieSegment2);
      // #endregion
    };
    
    simplePieChart("scichart-root");
    
    async function builderExample(divElementId) {
      // #region ExampleB
      // Demonstrates how to create a pie chart with SciChart.js using the Builder API
      const {
        chartBuilder,
        ESciChartSurfaceType,
        ESeriesType,
        EThemeProviderType
      } = SciChart;
    
      // or, for npm, import { chartBuilder, ... } from "scichart"
    
      const sciChartPieChart = await chartBuilder.buildChart(divElementId, {
        type: ESciChartSurfaceType.Pie2D,
        options: {
          surface: { theme: { type: EThemeProviderType.Dark } },
          segments: [
            { text: "This", value: 10, color: "red" },
            { text: "That", value: 5, color: "blue" },
            { text: "Other", value: 7, color: "green" }
          ]
        }
      });
    
    };
    
  }

  /*----------------------------------------------------------------------------------------------------------------------------------------*/

// PRESONAL LOAN SECTION
// format textbox for home loan
function presonalformatNumber() {
  var inputElement = document.getElementById("presonalLoanAmount");
  var inputValue = inputElement.value.replace(/,/g, "");
  var formattedValue = Number(inputValue).toLocaleString();
  inputElement.value = formattedValue;
}

// Home loan Slider
var presonalAmountSlider = document.getElementById("presonalLoanAmountSlider");
var presonalAmountOutput = document.getElementById("presonalLoanAmount");
presonalAmountOutput.value = formatNumberWithCommas(presonalAmountSlider.value);

presonalAmountSlider.oninput = function () {
  presonalAmountOutput.value = formatNumberWithCommas(this.value);
};

// Interest Rate slider
var presonalSlider = document.getElementById("presonalLoanintrestSlider");
var presonalOutput = document.getElementById("presonalInterestRate");

// Initialize the textbox with the default slider value
preesonalUpdateTextboxValue(parseFloat(presonalSlider.value));

// Update the textbox value each time you drag the slider handle
presonalSlider.oninput = function() {
  preesonalUpdateTextboxValue(parseFloat(this.value));
}

function preesonalUpdateTextboxValue(value) {
    if (Number.isInteger(value)) {
      presonalOutput.value = value.toFixed(0);
    } else {
      presonalOutput.value = value.toFixed(2);
    }
}

function formatNumberWithCommas(x) {
  var numStr = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(numStr)) {
    numStr = numStr.replace(pattern, "$1,$2");
  }
  return numStr;
}

// Loan tenure slider
const presonalTenureRange = document.getElementById("presonalLoanTenureSlider");
const presonalTenureInputBox = document.getElementById("presonalLoanTenure");
const presonalYearChecked = document.getElementById("presonalYearChecked");
const presonalMonthChecked = document.getElementById("presonalMonthChecked");

if (presonalYearChecked.checked) {
  presonalSetupYearTenure();
} else {
  PresonalSetupMonthTenure();
}


// Event listener for tenure type change
presonalYearChecked.addEventListener('change', presonalSetupYearTenure);
presonalMonthChecked.addEventListener('change', PresonalSetupMonthTenure);

function presonalSetupYearTenure() {
  presonalTenureRange.setAttribute('min', '1');
  presonalTenureRange.setAttribute('max', '5');
  presonalTenureRange.setAttribute('value', '5');
  presonalTenureInputBox.value = presonalTenureRange.value;

  function updateValue() {
    presonalTenureInputBox.value = presonalTenureRange.value;
  }
// Remove any existing event listeners to avoid duplicates
presonalTenureRange.removeEventListener('input', updateValue);

// Add the updated event listener
presonalTenureRange.addEventListener('input', updateValue);
}

// Function to set up tenure for months
function PresonalSetupMonthTenure() {
presonalTenureRange.setAttribute('min', '1');
presonalTenureRange.setAttribute('max', '60');
presonalTenureRange.setAttribute('value', '12');
presonalTenureInputBox.value = presonalTenureRange.value;

function updateValue() {
  presonalTenureInputBox.value = presonalTenureRange.value;
}

// Remove any existing event listeners to avoid duplicates
presonalTenureRange.removeEventListener('input', updateValue);

// Add the updated event listener
presonalTenureRange.addEventListener('input', updateValue);
}

// ---------------------------------------------------------------------------------------------------



document.addEventListener('DOMContentLoaded', function() {
  const carsSelect = document.getElementById('carsSection');
  const usdDollarResult = document.getElementById('usdDollarResult');
  const inrRupeeResult = document.getElementById('inrRupeeResult');
  const toggleButton = document.getElementById('toggleButton');

  function toggleResultSections(selectedOption) {
      if (selectedOption === 'carsSectionRupee') {
          usdDollarResult.style.display = 'block';
          inrRupeeResult.style.display = 'none';
      } else if (selectedOption === 'carsSectionDollar') {
          usdDollarResult.style.display = 'none';
          inrRupeeResult.style.display = 'block';
      }
  }

  // Event listener for the dropdown change
  carsSelect.addEventListener('change', function() {
      toggleResultSections(this.value);
  });

  // Initial display based on the default dropdown value
  toggleResultSections(carsSelect.value);

  // Optional: Button click listener to perform the same action (can be removed if not needed)
  toggleButton.addEventListener('click', function() {
      toggleResultSections(carsSelect.value);
  });
});



function presonalCalculateEMI() {
  
document.getElementById("presonalPieChartResult").style.display="block";

      // Ensure all input elements exist and are correctly referenced.
      var loanAmountElement = document.getElementById("presonalLoanAmount");
      var interestRateElement = document.getElementById("presonalInterestRate");
      var tenureElement = document.getElementById("presonalLoanTenure");
      var tenureTypeElement = document.querySelector('input[name="tenureType"]:checked');
  
      // Check if inputs are not null or undefined.
      if (!loanAmountElement || !interestRateElement || !tenureElement || !tenureTypeElement) {
          alert("Please make sure all fields are filled out correctly.");
          return;
      }
  
      // Parse input values.
      var loanAmount = parseFloat(loanAmountElement.value.replace(/,/g, ''));
      var interestRate = parseFloat(interestRateElement.value);
      var tenure = parseFloat(tenureElement.value);
      var tenureType = tenureTypeElement.id;
  
      // Basic input validation.
      if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(tenure)) {
          alert("Invalid input. Please enter numeric values for loan amount, interest rate, and tenure.");
          return;
      }
  
      // Convert interest rate into a monthly percentage.
      var monthlyInterestRate = interestRate / 12 / 100;
  
      // Convert tenure to months if it is in years.
      var tenureMonths = tenureType === 'presonalYearChecked' ? tenure * 12 : tenure;
  
      // Calculate EMI.
      var emi = loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenureMonths) / (Math.pow((1 + monthlyInterestRate), tenureMonths) - 1);
      
      // Handle division by zero if interest rate is 0.
      if (!isFinite(emi)) {
          alert("The calculation resulted in an invalid number. Please check the interest rate.");
          return;
      }
  
      // Calculate total payment and interest.
      var totalPayment = emi * tenureMonths;
      var totalInterestPayable = totalPayment - loanAmount;
  
      // Update the results.
      document.getElementById("presonalEmiResult").innerText = emi.toFixed(2);
      document.getElementById("presonalTotalInterestResult").innerText = totalInterestPayable.toFixed(2);
      document.getElementById("presonalTotalPaymentResult").innerText = totalPayment.toFixed(2);



      // rupee to dollar
var presonalDollarEmi = emi.toFixed(2);
var presonalDollarintrest = totalInterestPayable.toFixed(2);
var presonalDollarTotalPayment = totalPayment.toFixed(2);

var pd1= presonalDollarEmi/82.92;
var pd2= presonalDollarintrest/82.92;
var pd3= presonalDollarTotalPayment/82.92;


document.getElementById("rupeeLoanEmi").innerText=pd1.toFixed(2)
document.getElementById("rupeeIntrestEmi").innerText=pd2.toFixed(2)
document.getElementById("rupeeTotalEmi").innerText=pd3.toFixed(2)


// dollar to rupee

var presonalRupeeEmi = emi.toFixed(2);
var presonalRupeeIntrest = totalInterestPayable.toFixed(2);
var presonalRupeeTotalPayment = totalPayment.toFixed(2);


var pr1= presonalRupeeEmi*82.92;
var pr2= presonalRupeeIntrest*82.92;
var pr3= presonalRupeeTotalPayment*82.92;


document.getElementById("dollarLoanEmi").innerText=pr1.toFixed(2);
document.getElementById("dollarIntrestEmi").innerText=pr2.toFixed(2);
document.getElementById("dollarTotalEmi").innerText=pr3.toFixed(2);



// Chart
async function simplePieChart(divElementId) {

  // ------------------------------------------------------------------------------
  
    // Get input values
    var loanAmount = parseFloat(document.getElementById("presonalLoanAmount").value);
    var interestRate = parseFloat(document.getElementById("presonalInterestRate").value);
    var loanTenure = parseFloat(document.getElementById("presonalLoanTenure").value);
  
    // Calculate monthly interest rate and number of payments
    var monthlyInterestRate = interestRate / 12 / 100;
    var numberOfPayments = loanTenure * 12;
  
    // Calculate monthly payment
    var monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    
    // Calculate total payment and total interest
    var totalPayment = monthlyPayment * numberOfPayments;
    var totalInterest = totalPayment - loanAmount;
  
    // Calculate percentages
    var interestPercentage = (totalInterest / totalPayment) * 100;
    var principalPercentage = 100 - interestPercentage;
  
    // Display results
  
    var b = principalPercentage.toFixed(2) + '%';
    var c = interestPercentage.toFixed(2) + '%';
  

    // ------------------------------------------------------------------------------
  
      // #region ExampleA
      // Demonstrates how to create a pie chart with SciChart.js
      const {
        SciChartPieSurface,
        EPieType,
        SciChartJsNavyTheme,
        PieSegment,
        ELegendPlacement,
        ELegendOrientation,
        GradientParams,
        Point
      } = SciChart;
    
      // or, for npm, import { SciChartPieSurface, ... } from "scichart"
    
      // Create the pie chart
      const sciChartPieSurface = await SciChartPieSurface.create(divElementId, {
        theme: new SciChartJsNavyTheme(),
        pieType: EPieType.Pie,
        animate: true,
      });
    
      // Additional legend options
      sciChartPieSurface.legend.showLegend = true;
      sciChartPieSurface.legend.showCheckboxes = true;
      sciChartPieSurface.legend.animate = true;
      sciChartPieSurface.legend.placement = ELegendPlacement.TopRight;
      sciChartPieSurface.legend.orientation = ELegendOrientation.Vertical;
    
      // Create pie segments with value, colour and text
      const pieSegment1 = new PieSegment({
        color: "#5633CF",
        value: parseFloat(b.replace('%', '')),
        text: "Principal Loan Amount",
        colorLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
          { color: "#5633CF", offset: 0 },
          { color: "#5633CF", offset: 1 },
        ]),
      });
      const pieSegment2 = new PieSegment({
        value:parseFloat(c.replace('%', '')),
        text: "Total Interest",
        colorLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
          { color: "#FF9933", offset: 0 },
          { color: "#FF9933", offset: 1 },
        ]),
      });
     
      sciChartPieSurface.pieSegments.add(pieSegment1, pieSegment2);
      // #endregion
    };
    
    simplePieChart("presonalScichart-root");
    
    async function builderExample(divElementId) {
      // #region ExampleB
      // Demonstrates how to create a pie chart with SciChart.js using the Builder API
      const {
        chartBuilder,
        ESciChartSurfaceType,
        ESeriesType,
        EThemeProviderType
      } = SciChart;
    
      // or, for npm, import { chartBuilder, ... } from "scichart"
    
      const sciChartPieChart = await chartBuilder.buildChart(divElementId, {
        type: ESciChartSurfaceType.Pie2D,
        options: {
          surface: { theme: { type: EThemeProviderType.Dark } },
          segments: [
            { text: "This", value: 10, color: "red" },
            { text: "That", value: 5, color: "blue" },
            { text: "Other", value: 7, color: "green" }
          ]
        }
      });
    
    };
    
  }

  /*----------------------------------------------------------------------------------------------------------------------------------------*/

// CAR LOAN SECTION
// format textbox for home loan
function presonalformatNumber() {
  var inputElement = document.getElementById("carLoanAmount");
  var inputValue = inputElement.value.replace(/,/g, "");
  var formattedValue = Number(inputValue).toLocaleString();
  inputElement.value = formattedValue;
}

// Home loan Slider
var carAmountSlider = document.getElementById("carLoanAmountSlider");
var carAmountOutput = document.getElementById("carLoanAmount");
carAmountOutput.value = formatNumberWithCommas(carAmountSlider.value);

carAmountSlider.oninput = function () {
  carAmountOutput.value = formatNumberWithCommas(this.value);
};

// Interest Rate slider
var carSlider = document.getElementById("carLoanintrestSlider");
var carOutput = document.getElementById("carInterestRate");

// Initialize the textbox with the default slider value
carUpdateTextboxValue(parseFloat(carSlider.value));

// Update the textbox value each time you drag the slider handle
carSlider.oninput = function() {
  carUpdateTextboxValue(parseFloat(this.value));
}

function carUpdateTextboxValue(value) {
    if (Number.isInteger(value)) {
      carOutput.value = value.toFixed(0);
    } else {
      carOutput.value = value.toFixed(2);
    }
}

function formatNumberWithCommas(x) {
  var numStr = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(numStr)) {
    numStr = numStr.replace(pattern, "$1,$2");
  }
  return numStr;
}

// Loan tenure slider
const carTenureRange = document.getElementById("carLoanTenureSlider");
const carTenureInputBox = document.getElementById("carLoanTenure");
const carYearChecked = document.getElementById("carYearChecked");
const carMonthChecked = document.getElementById("carMonthChecked");

if (carYearChecked.checked) {
  carSetupYearTenure();
} else {
  carSetupMonthTenure();
}


// Event listener for tenure type change
carYearChecked.addEventListener('change', carSetupYearTenure);
carMonthChecked.addEventListener('change', carSetupMonthTenure);

function carSetupYearTenure() {
  carTenureRange.setAttribute('min', '1');
  carTenureRange.setAttribute('max', '7');
  carTenureRange.setAttribute('value', '5');
  carTenureInputBox.value = carTenureRange.value;

  function updateValue() {
    carTenureInputBox.value = carTenureRange.value;
  }
// Remove any existing event listeners to avoid duplicates
carTenureRange.removeEventListener('input', updateValue);

// Add the updated event listener
carTenureRange.addEventListener('input', updateValue);
}

// Function to set up tenure for months
function carSetupMonthTenure() {
carTenureRange.setAttribute('min', '1');
carTenureRange.setAttribute('max', '84');
carTenureRange.setAttribute('value', '12');
carTenureInputBox.value = carTenureRange.value;

function updateValue() {
  carTenureInputBox.value = carTenureRange.value;
}

// Remove any existing event listeners to avoid duplicates
carTenureRange.removeEventListener('input', updateValue);

// Add the updated event listener
carTenureRange.addEventListener('input', updateValue);
}

// ---------------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function() {
  const carsSelect = document.getElementById('presonal');
  const usdDollarResult = document.getElementById('usdDollarResult');
  const inrRupeeResult = document.getElementById('inrRupeeResult');
  const toggleButton = document.getElementById('toggleButton');

  function toggleResultSections(selectedOption) {
      if (selectedOption === 'presonalRupee') {
          usdDollarResult.style.display = 'block';
          inrRupeeResult.style.display = 'none';
      } else if (selectedOption === 'presonalDollar') {
          usdDollarResult.style.display = 'none';
          inrRupeeResult.style.display = 'block';
      }
  }

  // Event listener for the dropdown change
  carsSelect.addEventListener('change', function() {
      toggleResultSections(this.value);
  });

  // Initial display based on the default dropdown value
  toggleResultSections(carsSelect.value);

  // Optional: Button click listener to perform the same action (can be removed if not needed)
  toggleButton.addEventListener('click', function() {
      toggleResultSections(carsSelect.value);
  });
});


function carCalculateEMI() {
  
document.getElementById("pieChartResult").style.display="block";

      // Ensure all input elements exist and are correctly referenced.
      var loanAmountElement = document.getElementById("carLoanAmount");
      var interestRateElement = document.getElementById("carInterestRate");
      var tenureElement = document.getElementById("carLoanTenure");
      var tenureTypeElement = document.querySelector('input[name="tenureType"]:checked');
  
      // Check if inputs are not null or undefined.
      if (!loanAmountElement || !interestRateElement || !tenureElement || !tenureTypeElement) {
          alert("Please make sure all fields are filled out correctly.");
          return;
      }
  
      // Parse input values.
      var loanAmount = parseFloat(loanAmountElement.value.replace(/,/g, ''));
      var interestRate = parseFloat(interestRateElement.value);
      var tenure = parseFloat(tenureElement.value);
      var tenureType = tenureTypeElement.id;
  
      // Basic input validation.
      if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(tenure)) {
          alert("Invalid input. Please enter numeric values for loan amount, interest rate, and tenure.");
          return;
      }
  
      // Convert interest rate into a monthly percentage.
      var monthlyInterestRate = interestRate / 12 / 100;
  
      // Convert tenure to months if it is in years.
      var tenureMonths = tenureType === 'carYearChecked' ? tenure * 12 : tenure;
  
      // Calculate EMI.
      var emi = loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenureMonths) / (Math.pow((1 + monthlyInterestRate), tenureMonths) - 1);
      
      // Handle division by zero if interest rate is 0.
      if (!isFinite(emi)) {
          alert("The calculation resulted in an invalid number. Please check the interest rate.");
          return;
      }
  
      // Calculate total payment and interest.
      var totalPayment = emi * tenureMonths;
      var totalInterestPayable = totalPayment - loanAmount;
  
      // Update the results.
      document.getElementById("carEmiResult").innerText = emi.toFixed(2);
      document.getElementById("carTotalInterestResult").innerText = totalInterestPayable.toFixed(2);
      document.getElementById("carTotalPaymentResult").innerText = totalPayment.toFixed(2);

// rupee to dollar
var carDollarEmi = emi.toFixed(2);
var carDollarintrest = totalInterestPayable.toFixed(2);
var carDollarTotalPayment = totalPayment.toFixed(2);

var d1= carDollarEmi/82.92;
var d2= carDollarintrest/82.92;
var d3= carDollarTotalPayment/82.92;


document.getElementById("rupeeLoanEmi").innerText=d1.toFixed(2)
document.getElementById("rupeeIntrestEmi").innerText=d2.toFixed(2)
document.getElementById("rupeeTotalEmi").innerText=d3.toFixed(2)


// dollar to rupee

var carRupeeEmi = emi.toFixed(2);
var carRupeeIntrest = totalInterestPayable.toFixed(2);
var carRupeeTotalPayment = totalPayment.toFixed(2);


var r1= carRupeeEmi*82.92;
var r2= carRupeeIntrest*82.92;
var r3= carRupeeTotalPayment*82.92;


document.getElementById("dollarLoanEmi").innerText=r1.toFixed(2);
document.getElementById("dollarIntrestEmi").innerText=r2.toFixed(2);
document.getElementById("dollarTotalEmi").innerText=r3.toFixed(2);









// Chart
async function simplePieChart(divElementId) {

  // ------------------------------------------------------------------------------
  
    // Get input values
    var loanAmount = parseFloat(document.getElementById("carLoanAmount").value);
    var interestRate = parseFloat(document.getElementById("carInterestRate").value);
    var loanTenure = parseFloat(document.getElementById("carLoanTenure").value);
  
    // Calculate monthly interest rate and number of payments
    var monthlyInterestRate = interestRate / 12 / 100;
    var numberOfPayments = loanTenure * 12;
  
    // Calculate monthly payment
    var monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    
    // Calculate total payment and total interest
    var totalPayment = monthlyPayment * numberOfPayments;
    var totalInterest = totalPayment - loanAmount;
  
    // Calculate percentages
    var interestPercentage = (totalInterest / totalPayment) * 100;
    var principalPercentage = 100 - interestPercentage;
  
    // Display results
  
    var b = principalPercentage.toFixed(2) + '%';
    var c = interestPercentage.toFixed(2) + '%';
  

    // ------------------------------------------------------------------------------
  
      // #region ExampleA
      // Demonstrates how to create a pie chart with SciChart.js
      const {
        SciChartPieSurface,
        EPieType,
        SciChartJsNavyTheme,
        PieSegment,
        ELegendPlacement,
        ELegendOrientation,
        GradientParams,
        Point
      } = SciChart;
    
      // or, for npm, import { SciChartPieSurface, ... } from "scichart"
    
      // Create the pie chart
      const sciChartPieSurface = await SciChartPieSurface.create(divElementId, {
        theme: new SciChartJsNavyTheme(),
        pieType: EPieType.Pie,
        animate: true,
      });
    
      // Additional legend options
      sciChartPieSurface.legend.showLegend = true;
      sciChartPieSurface.legend.showCheckboxes = true;
      sciChartPieSurface.legend.animate = true;
      sciChartPieSurface.legend.placement = ELegendPlacement.TopRight;
      sciChartPieSurface.legend.orientation = ELegendOrientation.Vertical;
    
      // Create pie segments with value, colour and text
      const pieSegment1 = new PieSegment({
        color: "#5633CF",
        value: parseFloat(b.replace('%', '')),
        text: "Principal Loan Amount",
        colorLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
          { color: "#5633CF", offset: 0 },
          { color: "#5633CF", offset: 1 },
        ]),
      });
      const pieSegment2 = new PieSegment({
        value:parseFloat(c.replace('%', '')),
        text: "Total Interest",
        colorLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
          { color: "#FF9933", offset: 0 },
          { color: "#FF9933", offset: 1 },
        ]),
      });
     
      sciChartPieSurface.pieSegments.add(pieSegment1, pieSegment2);
      // #endregion
    };
    
    simplePieChart("carScichart-root");
    
    async function builderExample(divElementId) {
      // #region ExampleB
      // Demonstrates how to create a pie chart with SciChart.js using the Builder API
      const {
        chartBuilder,
        ESciChartSurfaceType,
        ESeriesType,
        EThemeProviderType
      } = SciChart;
    
      // or, for npm, import { chartBuilder, ... } from "scichart"
    
      const sciChartPieChart = await chartBuilder.buildChart(divElementId, {
        type: ESciChartSurfaceType.Pie2D,
        options: {
          surface: { theme: { type: EThemeProviderType.Dark } },
          segments: [
            { text: "This", value: 10, color: "red" },
            { text: "That", value: 5, color: "blue" },
            { text: "Other", value: 7, color: "green" }
          ]
        }
      });
    
    };
    
  }

//   /*----------------------------------------------------------------------------------------------------------------------------------------*/

// car dynamic slider
document.getElementById('carLoanAmountSlider').addEventListener('input', function() {
  var value = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = 'linear-gradient(to right, #FF9933 0%, #FF9933 ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});

  
document.getElementById('carLoanintrestSlider').addEventListener('input', function() {
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = 'linear-gradient(to right, #6699FF 0%, #6699FF ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});



document.getElementById('carLoanTenureSlider').addEventListener('input', function() {
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = 'linear-gradient(to right, #99CC33 0%, #99CC33 ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});


  // presonal dynamic slider
document.getElementById('presonalLoanAmountSlider').addEventListener('input', function() {
  var value = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = 'linear-gradient(to right, #FF9933 0%, #FF9933 ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});

document.getElementById('presonalLoanintrestSlider').addEventListener('input', function() {
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = 'linear-gradient(to right, #6699FF 0%, #6699FF ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});

document.getElementById('presonalLoanTenureSlider').addEventListener('input', function() {
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = 'linear-gradient(to right, #99CC33 0%, #99CC33 ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});


// home  dynamic
document.getElementById('homeLoanAmountSlider').addEventListener('input', function() {
  var value = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = 'linear-gradient(to right, #FF9933 0%, #FF9933 ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});

document.getElementById('homeLoanintrestSlider').addEventListener('input', function() {
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = 'linear-gradient(to right, #6699FF 0%, #6699FF ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});

document.getElementById('homeLoanTenureSlider').addEventListener('input', function() {
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background = 'linear-gradient(to right, #99CC33 0%, #99CC33 ' + value + '%, #ffffff ' + value + '%, #ffffff 100%)';
});


// car steps dynamically
document.addEventListener('DOMContentLoaded', function() {
  const monthlyRadioButton = document.getElementById('carMonthChecked');
  const yearlyRadioButton = document.getElementById('carYearChecked');
  const monthlyDiv = document.getElementById('monthlyDiv');
  const yearlyDiv = document.getElementById('yearlyDiv');

  // Function to show/hide divs
  function toggleDivs() {
      if (monthlyRadioButton.checked) {
          monthlyDiv.style.display = '';
          yearlyDiv.style.display = 'none';
      } else if (yearlyRadioButton.checked) {
          monthlyDiv.style.display = 'none';
          yearlyDiv.style.display = '';
      }
  }

  // Add event listeners
  monthlyRadioButton.addEventListener('change', toggleDivs);
  yearlyRadioButton.addEventListener('change', toggleDivs);

  // Initialize the correct display based on the current checked state
  toggleDivs();
});



// presonal Steps dynamically

document.addEventListener('DOMContentLoaded', function() {
  const monthlyRadioButton = document.getElementById('presonalMonthChecked');
  const yearlyRadioButton = document.getElementById('presonalYearChecked');
  const monthlyDiv = document.getElementById('monthPresonalSteps');
  const yearlyDiv = document.getElementById('yearPresonalSteps');

  // Function to show/hide divs
  function toggleDivs() {
      if (monthlyRadioButton.checked) {
        monthPresonalSteps.style.display = '';
        yearPresonalSteps.style.display = 'none';
      } else if (yearlyRadioButton.checked) {
        monthPresonalSteps.style.display = 'none';
        yearPresonalSteps.style.display = '';
      }
  }

  // Add event listeners
  monthlyRadioButton.addEventListener('change', toggleDivs);
  yearlyRadioButton.addEventListener('change', toggleDivs);

  // Initialize the correct display based on the current checked state
  toggleDivs();
});



// home Steps dynamically

document.addEventListener('DOMContentLoaded', function() {
  const monthlyRadioButton = document.getElementById('monthChecked');
  const yearlyRadioButton = document.getElementById('yearChecked');
  const monthlyDiv = document.getElementById('homeMonthSteps');
  const yearlyDiv = document.getElementById('homeYearSteps');

  // Function to show/hide divs
  function toggleDivs() {
      if (monthlyRadioButton.checked) {
        homeMonthSteps.style.display = '';
        homeYearSteps.style.display = 'none';
      } else if (yearlyRadioButton.checked) {
        homeMonthSteps.style.display = 'none';
        homeYearSteps.style.display = '';
      }
  }

  // Add event listeners
  monthlyRadioButton.addEventListener('change', toggleDivs);
  yearlyRadioButton.addEventListener('change', toggleDivs);

  // Initialize the correct display based on the current checked state
  toggleDivs();
});



//home loan icon change
document.addEventListener('DOMContentLoaded', (event) => {
  const carsSelect = document.getElementById('cars');
  const totalRupeeIcon = document.getElementById('totalRupeeIcon');
  const totalDollarIcon = document.getElementById('totalDollarIcon');
  const interestRupeeIcon = document.getElementById('intrestRupeeIcon');
  const interestDollarIcon = document.getElementById('intrestDollarIcon');
  const rupeeIcon = document.getElementById('rupeeIcon');
  const dollarIcon = document.getElementById('dollarIcon');

  function toggleIcons(value) {
      const isRupee = value === 'he';
      totalRupeeIcon.style.display = isRupee ? 'inline' : 'none';
      totalDollarIcon.style.display = isRupee ? 'none' : 'inline';
      interestRupeeIcon.style.display = isRupee ? 'inline' : 'none';
      interestDollarIcon.style.display = isRupee ? 'none' : 'inline';
      rupeeIcon.style.display = isRupee ? 'inline' : 'none';
      dollarIcon.style.display = isRupee ? 'none' : 'inline';
  }

  carsSelect.addEventListener('change', function() {
      toggleIcons(this.value);
  });

  // Initial icon setup
  toggleIcons(carsSelect.value);
});



//Car loan icon change
document.addEventListener('DOMContentLoaded', (event) => {
  const carsSelect = document.getElementById('carsSection');
  const totalRupeeIcon = document.getElementById('carTotalRupeeIcon');
  const totalDollarIcon = document.getElementById('carTotalDollarIcon');
  const interestRupeeIcon = document.getElementById('carIntrestRupeeIcon');
  const interestDollarIcon = document.getElementById('carIntrestDollarIcon');
  const rupeeIcon = document.getElementById('carRupeeIcon');
  const dollarIcon = document.getElementById('carDollarIcon');

  function toggleIcons(value) {
      const isRupee = value === 'carsSectionRupee';
      totalRupeeIcon.style.display = isRupee ? 'inline' : 'none';
      totalDollarIcon.style.display = isRupee ? 'none' : 'inline';
      interestRupeeIcon.style.display = isRupee ? 'inline' : 'none';
      interestDollarIcon.style.display = isRupee ? 'none' : 'inline';
      rupeeIcon.style.display = isRupee ? 'inline' : 'none';
      dollarIcon.style.display = isRupee ? 'none' : 'inline';
  }

  carsSelect.addEventListener('change', function() {
      toggleIcons(this.value);
  });

  // Initial icon setup
  toggleIcons(carsSelect.value);
});


//Car loan icon change
document.addEventListener('DOMContentLoaded', (event) => {
  const carsSelect = document.getElementById('presonal');
  const totalRupeeIcon = document.getElementById('presonalTotalRupeeIcon');
  const totalDollarIcon = document.getElementById('presonalTotalDollarIcon');
  const interestRupeeIcon = document.getElementById('presonalIntrestRupeeIcon');
  const interestDollarIcon = document.getElementById('presonalIntrestDollarIcon');
  const rupeeIcon = document.getElementById('presonalRupeeIcon');
  const dollarIcon = document.getElementById('presonalDollarIcon');

  function toggleIcons(value) {
      const isRupee = value === 'presonalRupee';
      totalRupeeIcon.style.display = isRupee ? 'inline' : 'none';
      totalDollarIcon.style.display = isRupee ? 'none' : 'inline';
      interestRupeeIcon.style.display = isRupee ? 'inline' : 'none';
      interestDollarIcon.style.display = isRupee ? 'none' : 'inline';
      rupeeIcon.style.display = isRupee ? 'inline' : 'none';
      dollarIcon.style.display = isRupee ? 'none' : 'inline';
  }

  carsSelect.addEventListener('change', function() {
      toggleIcons(this.value);
  });

  // Initial icon setup
  toggleIcons(carsSelect.value);
});