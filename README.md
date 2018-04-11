# How UAE is Becoming a Hotel Luxury Destination
## Summary
In 1985, hotel guests in the UAE were only 550k in total. In 2005, that number grew to 7.2 million - a 12 times increase in just 2 decades. And of that 7.2 million, 40% were guests who stayed in a Five star hotel. This chart shows the annual growth of demand of luxury hotels in the UAE for the past 20 years. It also outlines key events that has influenced the incredible development in the country's hotel industry.
## Design
This visualization is a line time series graph that aggregates the count of guests for each year. I was inspired by Amanda Cox's article in NYT, [The Jobless Rate for People Like You](https://archive.nytimes.com/www.nytimes.com/interactive/2009/11/06/business/economy/unemployment-lines.html). She made this visualization to explain the different segmentation of the Unemployment Rate in the US and compare it with the average. By using the same method in my visualization, users are able to compare the selected blue line to another line that is highlighted in orange when the user hovers his/her mouse over it. In addition, viewers are able to see the trend between each year by the slope of the line between each circle.

**First Revision:**
I have revised my visualization to include an animation that will guide the user to the story. Upon entering the site, the story is told sequentially as filters are changed according to Emirate (State), Hotel Class and Nationality. Annotations, found on the right, will highlight key events that explains the dips and spikes in the graph as the filters are changed. As the animation ends, the user is able to explore the dataset by themselves by manually changing the graph either from the filters or by clicking on the lines. They will also be able easily compare the line in focus with the background lines by hovering over one as it is highlighted in orange.

**Second Revision:**

**Third Revision:**

## Feedback
*"It doesn't leave me with an answer to the question you posed which was: The Reason Why UAE is Building More 5-Star Hotels.  It doesn't tell the story of why, only that there are more. Remember the goal here is to be explanatory rather than exploratory, this provides information but no insights." - From Randy J in Slack*

**Revisions:** Added animated story to guide audience upon entering the site.

*"I thought that the illustration was broken because I was clicking on the links and the graph changes. The paragraph explained it good. I understood what was being communicated. - From Jonas, a friend."*

**Revisions:** Disabled the filters and lines when the Story is being told.





## Resources

Design Inspired by Amanda Cox at NYT [The Jobless Rate for People Like You](https://archive.nytimes.com/www.nytimes.com/interactive/2009/11/06/business/economy/unemployment-lines.html)

News from google.ae/publicdata [UAE GDP per capita ](https://www.google.ae/publicdata/explore?ds=d5bncppjof8f9_&met_y=ny_gdp_pcap_cd&hl=en&dl=en#!ctype=l&strail=false&bcs=d&nselm=h&met_y=ny_gdp_pcap_cd&scale_y=lin&ind_y=false&rdim=region&idim=country:ARE&ifdim=region&hl=en_US&dl=en&ind=false)

News from gulfnews [Timeline of UAE and United Kingdom Ties](http://gulfnews.com/news/uae/government/timeline-of-uae-and-united-kingdom-ties-1.1175874)

Mike Bostock's [Multi Series Graph](https://bl.ocks.org/mbostock/3884955)

W3schools' [Group Buttons](https://www.w3schools.com/howto/howto_css_button_group_vertical.asp)

d3noobs' [Simple d3.js tooltip](http://bl.ocks.org/d3noob/a22c42db65eb00d4e369)

phoebebright's [D3 Nest Tutorial and examples] (http://bl.ocks.org/phoebebright/raw/3176159/)
