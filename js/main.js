var svg = d3.select("svg"),
  margin = {top: 20, right: 80, bottom: 30, left: 10},
  width = svg.attr("width") - margin.left - margin.right,
  height = svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", "translate(" +
      margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");

var select_em = "All Emirates"; // Default filter Values.
var select_st = "All Classes";
var select_nt = "All Nationalities";

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]);

var drawline = d3.line() // Draws my lines according to the appropriate scales.
    .x(function(d) {
      return x(new Date(d.key));
    })
    .y(function(d) {
      return y(d.value);
    });

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function filterMe(name, dat, d) { // When All selections are chosen, this helps
  if (dat == "All Emirates") {    // me return all datapoints for my Filters.
    return d[name] != undefined;
  } else if (dat == "All Classes") {
    return d[name] != undefined;
  } else if (dat == "All Nationalities") {
    return d[name] != undefined;
  } else {
    return d[name] == dat;
  }
};

function nestdata(dat) {  // Groups data according to years.
  var nested = d3.nest()  // Returns the Sum of guests.
    .key(function(d) {    // Data is filtered according to Filters selected.
      return d.year.getFullYear();
    })
    .sortKeys(d3.ascending)
    .rollup(function(leaves) {
      return d3.sum(leaves, function(d) {
          return d.guests;
        })
    })
    .entries(dat);
  return nested
};

function drawOutline(dat) { // Draws my background lines.
  var filter_collect = []   // Not all variations drawen on the page.
  var em = ["All Emirates", "Dubai", "Abu Dhabi"]
  var cl = ["All Classes", "Five star",
            "Four star", "Three star", "Two star"]
  var na = ["All Nationalities", "UK", "UAE", "GCC", "Russia", "USA"]

  for (i=0; i< em.length; i++) {    // Nested Loop that draws variations of the
    for (b=0; b< cl.length; b++) {  // preselected parameters.
      for (c=0; c< na.length; c++) {
        var elem = {}
        var filter_new = dat.filter(function(d) {
          return (filterMe("emirate", em[i], d) &&
                  filterMe("class", cl[b], d) &&
                  filterMe("nationality", na[c], d));
        })
        elem["values"] = nestdata(filter_new)
        elem["emirate"] = em[i]
        elem["class"] = cl[b]
        elem["nationality"] = na[c]
        filter_collect.push(elem)
      }
    }
  }
  return [filter_collect]
};

d3.csv("data/output.csv", type, function(error, data) {
  if (error) throw error; // Executes js as data is loaded.

  var nested_data = nestdata(data);

  x.domain(d3.extent(data, function(d) {
    return d.year;
  }));

  y.domain([0, d3.max(nested_data, function(d) {
    return d.value;
  }) * 1.2]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisRight(y))
      .attr("transform", "translate(" + width + ",0)")
      .append("text")
      .attr("y", 10)
      .attr("x", -40)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Guests")

  var outlines = g.append("g")
    .data(drawOutline(data))
    .selectAll("path")
    .data(function(d) { return d; })
    .enter()
    .append("g")

  outlines.append("path")
    .attr("class", "link outline")
    .attr("d", function(d) {
      return drawline(d.values)
    });

  outlines.append("path")
    .attr("class", "hit outline")
    .attr("d", function(d) {
      return drawline(d.values)
    });

  g.append("path")
      .attr("class", "line")
      .attr("d", drawline(nested_data) );

  g.selectAll("circle")
      .data(nested_data)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", function(d) { return x(new Date(d.key))} )
      .attr("cy", function(d) { return y(d.value)} )
      .attr("r", 3);

  function updateData(emirate, star, nationality) { // Updates my chart.
    var filtered = data.filter(function(d) { // Filters my data first.
      return (filterMe("emirate", emirate, d) &&
              filterMe("class", star, d) &&
              filterMe("nationality", nationality, d));
    });

    var nestfilter = nestdata(filtered); // Nests the filtered data by year.

    y.domain([0, d3.max(nestfilter, function(d) { // Adjusts Y scale.
      return d.value;
    }) * 1.5]); // Added allowance so that line does not goes to edge.

    g.select(".axis--y") // Animates my adjusted y axis.
      .transition()
      .duration(500)
      .call(d3.axisRight(y));

    g.select(".line") // Animates my slected line.
      .transition()
      .duration(500)
      .attr("d", drawline(nestfilter, function(d) {return d.key}));

    g.select(".line")
      .enter()
      .transition()
      .duration(500)
      .attr("d", drawline(nestfilter, function(d) {return d.key}));

    g.selectAll(".outline") // Animates my background lines
      .transition()
      .duration(500)
      .attr("d", function(d) {
        return drawline(d.values, function(c) {
        return c.key;
        }) });

    var circles = g.selectAll("circle") // Adds circles to my points.
      .data(nestfilter, function(d) {return d.key});

    circles.exit()
      .transition()
      .duration(500)
        .attr("cx", function(d) {
          return x(new Date(d.key))} )
        .attr("cy", y(d3.min(nestfilter, function(d) {
          return d.value;
        })* 1.5));

    circles.transition()
      .duration(500)
        .attr("cx", function(d) {return x(new Date(d.key)); } )
        .attr("cy", function(d) {return y(d.value); } );

    circles.enter()
      .append("circle")
      .attr("cx", function(d) {return x(new Date(d.key)); } )
      .attr("cy", function(d) {return y(d.value); } );

    annotate(emirate, star, nationality); // Annotates based on selections.
  };

  var story_seq = [ // Sequence of the Story.
    ["Dubai", "Five star", "UK"],
    ["Abu Dhabi", "Five star", "UAE"],
    ["Dubai", "Five star", "Russia"],
    ["All Emirates", "All Classes", "All Nationalities"]
  ]
  var page = 0;
  var story_interval = setInterval(function() { // Animates my Story.
    updateData(story_seq[page][0], story_seq[page][1], story_seq[page][2]);

    if (page >= 3) {
      clearInterval(story_interval);
      activateBtns(); // Activates my Buttons when story ends.
    }

    d3.selectAll(".selected").attr("class", "") // Selects my buttons according
    d3.selectAll("#myEmirate")                  // to Story.
      .selectAll("#" + story_seq[page][0].replace(/ /g,''))
      .attr("class", "selected")

    d3.selectAll("#myStar")
      .selectAll("#" + story_seq[page][1].replace(/ /g,''))
      .attr("class", "selected")

    d3.selectAll("#myNation")
      .selectAll("#" + story_seq[page][2].replace(/ /g,''))
      .attr("class", "selected")

    page++;
  }, 3000);

  function activateBtns() { // Activates my Buttons.
    d3.select("#myEmirate")
      .selectAll("button")
      .on("click", function() {
        d3.select(this.parentNode).select(".selected").attr("class", "")
        d3.select(this).attr("class", "selected")
        select_em = d3.select(this).text();
        updateData(select_em, select_st, select_nt);
      });

    d3.select("#myStar")
      .selectAll("button")
      .on("click", function() {
        d3.select(this.parentNode).select(".selected").attr("class", "")
        d3.select(this).attr("class", "selected")
        select_st = d3.select(this).text();
        updateData(select_em, select_st, select_nt);
      });

    d3.select("#myNation")
      .selectAll("button")
      .on("click", function() {

        d3.select(this.parentNode).select(".selected").attr("class", "")
        d3.select(this).attr("class", "selected")
        select_nt = d3.select(this).text();
        updateData(select_em, select_st, select_nt);
      });

    d3.selectAll(".hit") // Adds a line in front of my background lines.
      .on("mouseover", function(d) { // This fatter line makes it easier
        d3.select(this.parentNode).select(".link") // to click on lines.
        .style("stroke", "orange") // Turns line to orange on mouse over.
        .style("opacity", 1)
        .style("stroke-width", "2px")
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.emirate + "<br>" + d.class + "<br>" + d.nationality)
          .style("left", (d3.event.pageX) + "px") // Adds tool tips to preview.
          .style("top", (d3.event.pageY - 0) + "px");
        })
      .on("mouseout", function(d) {
        d3.select(this.parentNode).select(".link")
        .style("stroke", "lightgrey")
        .style("opacity", .3)
        .style("stroke-width", "1.5px")
        div.transition()
          .duration(100)
          .style("opacity", 0);
        })
        .on("click", function(d) {
          updateData(d.emirate, d.class, d.nationality);

          d3.selectAll(".selected").attr("class", "") // When new line is
          d3.selectAll("#myEmirate")                  // selected, changes
            .selectAll("#" + d.emirate.replace(/ /g,'')) // filters accordingly.
            .attr("class", "selected")

          d3.selectAll("#myStar")
            .selectAll("#" + d.class.replace(/ /g,''))
            .attr("class", "selected")

          d3.selectAll("#myNation")
            .selectAll("#" + d.nationality.replace(/ /g,''))
            .attr("class", "selected")
        });

      d3.select("#highlight").remove() // Disables blinking when story is done.
      annotation.select("h2")
        .append("span").text(" - Change filters to explore.")
    }
});

var myButtons = [ // My Filters.
  {
    "name": "myEmirate",
    "values": ["All Emirates", "Dubai", "Abu Dhabi", "Ajman and Sharjah",
    "Umm Al Quwain", "Ras Al-Khaimah and Fujairah"]
  },{
    "name": "myStar",
    "values": ["All Classes", "Five star",
                "Four star", "Three star", "Two star"]
  },{
    "name": "myNation",
    "values": ["All Nationalities", "UAE", "GCC", "UK", "USA", "Russia",
              "Other Europian", "Other Asian"]
  }]

d3.select("body #filter") // Adds my Filters
  .selectAll("div")
  .data(myButtons)
  .enter()
  .append("div")
  .attr("class", "btn-group")
  .attr("id", function(d){return d.name})
  .selectAll("button")
  .data(function(d) {return d.values;})
  .enter()
  .append("button")
  .attr("id", function(d) {return d.replace(/ /g,'');}) // Uses content as id.
  .text(function(c) {return c;})

d3.selectAll(".btn-group").select("button")
  .attr("class", "selected")

var script = [ // Annotation Script.
"1984: UAE and UK Trade Relations Improved. <br>\
 1992: Emirates Airlines teams up with Air London Int.<br>\
 1993: UK Exports to UAE increase by 40%.<br>\
 1994: UK affirms support to UAE over disputed islands with Iran.<br>\
 1996: UAE signs a Defence Cooperation Aggreement with UK.<br>\
 1997: Dubai World Cup.<br>\
 1997: UK hotel guests reached 800k. Most stayed at Five Star.<br>",
"2000: 5 Star Hotels in Abu Dhabi caters to 1.1mil UAE nationals.<br>\
 2000: UAE GDP per capita rise to 30k USD, +17% vs previous year. ",
"1996: Russian economy started to improve.<br>\
  1996: Russian Visitors starts to travel to Dubai."
]

var annotation = d3.select("#filter")
.append("div")

annotation.append("h2").text("Highlights")
  .append("span").attr("id", "highlight").text(" - Story ongoing")
annotation.append("div")
  .attr("id", "teleprompt")
  .html("")

function blink() { // Adds Announcement that Story is ongoing.
  d3.select("#highlight").transition()
    .duration(1000)
    .style("color", "orange")
    .transition()
    .duration(1000)
    .style("color", "white")
    .on("end", blink)
};

blink();

var teleprompt = d3.select("#teleprompt")

function annotate(em, cl, na) { // Adds Annodation depending on selections.
  if (((em == "Dubai") | (em == "All Emirates")) &
      ((cl == "Five star") | (cl == "All Classes")) &
      (na == "UK")) {
    teleprompt.html(script[0])

  } else if (((em == "Abu Dhabi")) &
      ((cl == "Five star") | (cl == "All Classes")) &
      ((na == "UAE") | (na == "All Nationalities")))  {
    teleprompt.html(script[1])

  } else if (((em == "Dubai") | (em == "All Emirates")) &
      (na == "Russia"))  {
    teleprompt.html(script[2])

  } else {
    teleprompt.html("")
  }
};

function type(d) { // Parses my data to certain types.
  d.year = parseTime(d.year);
  d.guests = +d.guests;
  d.nights = +d.nights;
  return d;
}
