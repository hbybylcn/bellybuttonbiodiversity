


function initialChart(id) {

   
    d3.json("samples.json").then((data)=>{


        var selectedData=data.samples.filter(obj=>obj.id==id)

        // console.log(selectedData)

        var otuIds=selectedData[0].otu_ids;

        // console.log(otuIds)

        var sampleValues=selectedData[0].sample_values;

        console.log(sampleValues)

        var otuLabels=selectedData[0].otu_labels;

        console.log(otuLabels)



        // build bar chart
        // get the first 10 ids

        var otuLabelsTop=selectedData[0].otu_labels.slice(0,10);

        var sampleValuesTop=selectedData[0].sample_values.slice(0,10);
        var otuIdsTop=selectedData[0].otu_ids.slice(0,10).reverse();
        var otuIdsNew=otuIdsTop.map(data=>"OTU"+data)

        var data = [
            {
              x: sampleValuesTop,
              y: otuIdsNew,
              text:otuLabelsTop ,
              type: 'bar',
              orientation:'h',
              marker: {
                      color: 'rgba(55,128,191,0.6)',
                      width: 1
                    }
            }];
        var layout = {title: 'Hover over the points to see the text'};



        Plotly.newPlot('bar', data, layout);

            //  build buble chart

        var trace1 = {
                x: otuIds,
                y: sampleValues,
                text: otuLabels,
                mode: 'markers',
                marker: {
                  color: otuIds,
                  size: sampleValues
                }
            };
              
        var data = [trace1];
              
        var layout = {
                title: 'Bubble Chart Hover Text',
                showlegend: false,
                height: 600,
                width: 1000
            };
              
        Plotly.newPlot('bubble', data, layout);
            //     // build panel

    });
}

// put the ids in dropdown menu
d3.json("samples.json").then((data)=>{


    var dropdown=d3.select("#selDataset");

    data.names.forEach(data=>{

    dropdown.append("option").text(data).property("value",data);

    })

    var id=data.names[0];

    

    initialChart(id)
    panelInfo(id)
    

})


function optionChanged(selectedId){


    initialChart(selectedId)
    panelInfo(selectedId)
}


function panelInfo(id){

    d3.json("samples.json").then((data)=>{

        

        var metadata=data.metadata.filter(meta=>meta.id==id)


        var panelInfobox=d3.select("#sample-metadata")

        panelInfobox.html("");


        Object.entries(metadata[0]).forEach(key => {   
            panelInfobox.append("h6").text(key[0] + ": " + key[1] + "\n");    
        });

    })

}


