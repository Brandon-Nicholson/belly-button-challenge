console.log('app.js')

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function barGraph(id) {
    console.log(`barGraph(${id})`)
    d3.json(url).then(data => {
        console.log(data);

        let samples = data.samples
        let results = samples.filter(sample => sample.id == id)
        let results1 = results[0]
        let otu_ids = results1.otu_ids
        let otu_labels = results1.otu_labels
        let sample_values = results1.sample_values

        let yTicks = otu_ids.slice(0,10).map(otu => `otu ${otu}`).reverse()

        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yTicks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'
        };

        let graphData = [barData]

        let barLayout = {
            title: "Top 10 Bacteria Cultures",
            margin: {t:30, l: 150}

        };

        Plotly.newPlot('bar', graphData, barLayout)

    })
        
}

function bubbleChart(id) {
    console.log(`bubbleChart(${id})`)
    d3.json(url).then(data => {
        let samples = data.samples
        let results = samples.filter(sample => sample.id == id)
        let results1 = results[0]
        let otu_ids = results1.otu_ids
        let otu_labels = results1.otu_labels
        let sample_values = results1.sample_values

        let chartData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let bubbleData = [chartData]

        let chartLayout = {
            title: "Bacteria Cultures",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: {title: "ID"}
        }

        Plotly.newPlot('bubble', bubbleData, chartLayout)

    })
}

function metaData(id) {
    console.log(`metaData(${id})`)
    d3.json(url).then((data) => {
        let mydata = data.metadata
        console.log(mydata)
        let results = mydata.filter(m => m.id == id)[0]
        let demData = d3.select("#sample-metadata")

        demData.html('')

        Object.entries(results).forEach(([key, value]) => {
            demData.append('h6').text(`${key}: ${value}`)
        })
    })
}

function switchOption(id) {
    console.log(`New Option: ${id}`)
    barGraph(id)
    bubbleChart(id)
    metaData(id)
}

function dashBoard() {
    console.log('dashBoard')
    let select = d3.select('#selDataset')

    d3.json(url).then(data => {
        console.log('data: ')

        sampleName = data.names
        console.log('Sample Names: ', sampleName);

        for (let i = 0; i < sampleName.length; i++) {
            let newId = sampleName[i]
            select.append('option').text(newId).property('value', newId)
        };
    
        let firstId = select.property("value")
        
        barGraph(firstId)
        bubbleChart(firstId)
        metaData(firstId)

    });
}

dashBoard()