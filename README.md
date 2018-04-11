# How UAE is Becoming a Hotel Luxury Destination
## Summary
In 1985, hotel guests in the UAE were only 550k in total. In 2005, that number grew to 7.2 million - a 12 times increase in just 2 decades. And of that 7.2 million, 40% were guests who stayed in a Five star hotel. This chart shows the annual growth of demand of luxury hotels in the UAE for the past 20 years. It also outlines key events that has influenced the incredible development in the country's hotel industry.
## Design
This visualization is a line time series graph that aggregates the count of guests for each year. I was inspired by Amanda Cox's article in NYT, [The Jobless Rate for People Like You](https://archive.nytimes.com/www.nytimes.com/interactive/2009/11/06/business/economy/unemployment-lines.html). She made this visualization to explain the different segmentation of the Unemployment Rate in the US and compare it with the average. By using the same method in my visualization, users are able to compare the selected blue line to another line that is highlighted in orange when the user hovers his/her mouse over it. In addition, viewers are able to see the trend between each year by the slope of the line between each circle.

**First Revision:**
I have revised my visualization to include an animation that will guide the user to the story. Upon entering the site, the story is told sequentially as filters are changed according to Emirate (State), Hotel Class and Nationality. Annotations, found on the right, will highlight key events that explains the dips and spikes in the graph as the filters are changed. As the animation ends, the user is able to explore the dataset by themselves by manually changing the graph either from the filters or by clicking on the lines. They will also be able easily compare the line in focus with the background lines by hovering over one as it is highlighted in orange.

**Second Revision:**
Following tuzgai comment, it is a little bit unclear and vague to have All Nationalities as a selection in the filter. For anybody seeing this visualization for the first time, they would not be sure if it refers to the Guest's Nationality. I changed it to refer to All Guest Nationalities to point out that these filter group refers to the nationality of guests.

**Third Revision:**
The feedback was positive. There is nothing to change at this point. I would normally get another opinion but my mentor explained the visual properly. He was able to point out that Russians in 1996 had a sharp jump in guest visits and that he was able to tell it could be because of GDP per capita increase from my annotation. This tells me that the visual is clear and that he is getting the message.

## Feedback
*"It doesn't leave me with an answer to the question you posed which was: The Reason Why UAE is Building More 5-Star Hotels.  It doesn't tell the story of why, only that there are more. Remember the goal here is to be explanatory rather than exploratory, this provides information but no insights." - From Randy J, a friend from Slack*

**Revisions:** Added animated story to guide audience upon entering the site.

*"This looks good! The highlights section was helpful for revealing the potential reasons for the big changes in the data. Coming in cold I was a little confused by the nationalities selection - there might be a way to make it clearer it's talking about the nationality of the guests. - From tuzgai, a friend Slack."*

**Revisions:** Improved filter on All Nationalities to All Guest Nationalities

*"I think this is really well done Angelo! I like that you explained some of the noticeable jumps in the data from different regions and nationalities. I especially like that sharp jump in Russia in 96 and seeing how the Two Star guest count declines steadily from that point (and subsequent increase in Five star stays) as Russians become better off and could afford better accommodations. The rate of growth from year to year would have been interesting although showing the guest count certainly makes for a more dramatic visualization. Overall though I think this is really well done. I don't review that particular project so don't have the rubric requirements in front of me but I personally think you did a terrific job!" - From Ron, My Udacity Mentor*

**Revisions:** No Revisions.

## Resources

UAE Open Data from bayanat.ae [Hotels Guests and Nights By Class and Nationality](http://data.bayanat.ae/en_GB/dataset?q=hotels&groups=tourism&sort=score+desc%2C+metadata_modified+desc)

Design Inspired by Amanda Cox at NYT [The Jobless Rate for People Like You](https://archive.nytimes.com/www.nytimes.com/interactive/2009/11/06/business/economy/unemployment-lines.html)

News from google.ae/publicdata [UAE GDP per capita ](https://www.google.ae/publicdata/explore?ds=d5bncppjof8f9_&met_y=ny_gdp_pcap_cd&hl=en&dl=en#!ctype=l&strail=false&bcs=d&nselm=h&met_y=ny_gdp_pcap_cd&scale_y=lin&ind_y=false&rdim=region&idim=country:ARE&ifdim=region&hl=en_US&dl=en&ind=false)

World Bank [GDP per capita of UAE and Russia](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=AE-RU)

News from gulfnews [Timeline of UAE and United Kingdom Ties](http://gulfnews.com/news/uae/government/timeline-of-uae-and-united-kingdom-ties-1.1175874), [UAE’s nominal GDP expected to grow 12.5pc this year 2000](http://gulfnews.com/news/uae/general/uae-146-s-nominal-gdp-expected-to-grow-12-5pc-this-year-1.435562)

Mike Bostock's [Multi Series Graph](https://bl.ocks.org/mbostock/3884955)

W3schools' [Group Buttons](https://www.w3schools.com/howto/howto_css_button_group_vertical.asp)

d3noobs' [Simple d3.js tooltip](http://bl.ocks.org/d3noob/a22c42db65eb00d4e369)

phoebebright's [D3 Nest Tutorial and examples](http://bl.ocks.org/phoebebright/raw/3176159/)

Gerardo Furtado's [Blinking d3 Text](https://stackoverflow.com/questions/43063892/how-to-make-an-svg-text-with-d3-js-that-flashes-from-black-to-white-an-back-cont#43063952)
