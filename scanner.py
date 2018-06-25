import urllib
from lxml import html
import csv


url = "https://www.gla.ac.uk/undergraduate/degrees/mechanicalengineering/degreestructure/"
page = html.fromstring(urllib.urlopen(url).read())

allLinks = []
for links in page.xpath("//a"):
        allLinks.append(links)

def removeLinks(links, char):
    var = 0
    while (var<len(links)):
        if char not in str(links[var].get("href")):
                del links[var]
        else:
            var+=1
    return links

allLinks = removeLinks(allLinks, "www.gla.ac.uk/coursecatalogue/course/")

for link in allLinks:
    print link.text
    print link.get("href")[link.get("href").find("=")+1:]

csvfile = "mech.csv"

#Assuming res is a flat list
with open(csvfile, "w") as output:
    writer = csv.writer(output, lineterminator='\n')
    for link in allLinks:
        writer.writerow([link.get("href")[link.get("href").find("=")+1:]])    
