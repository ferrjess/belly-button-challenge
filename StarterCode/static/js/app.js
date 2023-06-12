const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

//
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 to get sample names and populate the drop-down selector
  d3.json(url).then((data) => {
      
      // Set a variable for the sample names
      let names = data.names;

      // Add  samples to dropdown menu
      names.forEach((id) => {

          // Log the value of id for each iteration of the loop
          console.log(id);

          dropdownMenu.append("option")
          .text(id)
          .property("value",id);
      });

      // Set the first sample from the list
      let sample_one = names[0];

      // Log the value of new
      console.log(newD);

      // Build the initial plots
      createScatter(newD);
      createBar(newD);
      createSummary(newD);

  });
};

// Function that creates bar chart
function createBar(bar) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all sample data
      let sampleInfo = data.samples;

      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == bar);

      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);

      // Set top ten items to display in descending order
      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let xticks = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();
      
      // Set up the trace for the bar chart
      let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h"
      };

      // Plot bar chart
      Plotly.newPlot("bar", [trace])
  });
};

// Function that creates scatter plot as bubble chart
function createScatter(bubble) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {
      
      // Retrieve all sample data
      let sampleInfo = data.samples;

      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == bubble);

      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);
      
      // Set up the trace for bubble chart
      let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
          }
      };
      // x-axis title
      let layout = {
        xaxis: {title: "OTU ID"},
      };

        // Plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function that gets summary info
function createSummary(summary) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter based on the value of the sample
      let value = metadata.filter(result => result.id == summary);

      // Log the array of metadata objects after the have been filtered
      console.log(value)

      // Get the first index from the array
      let valueData = value[0];

      // Clear out metadata
      d3.select("#sample-metadata").html("");

      // Use Object.entries to add each key/value pair to the panel
      Object.entries(valueData).forEach(([key,value]) => {

          // Log the individual key/value pairs as they are being appended to the metadata panel
          console.log(key,value);

          d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};

// Function that updates dashboard when sample is changed
function optionChanged(newID) { 

  // Log the new value
  console.log(newID); 

  // Call all functions 
  createScatter(newID)
  createBar(newID)
  createSummary(newID)
};

// Call the initialize function
init();


