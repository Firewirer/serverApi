import MySQLdb

db = MySQLdb.connect("localhost","root","root","courses")
cursor = db.cursor()

file1 = open("outcomelinks.csv", "r")

for line in file1:
    line = line.rstrip('\n')
    info = line.split(",")
    source = info[0].replace("ENG","500")
    if int(info[1])<10:
        source += "0"+info[1]
    else:
        source += info[1]
    target = info[2].replace("ENG","500")
    if int(info[3])<10:
        target += "0"+info[3]
    else:
        target += info[3]
        
    try:
        sql = "INSERT INTO `courses`.`outcomelinks` (`sourceId`, `targetId`) VALUES ('"+source+"', '"+target+"');"
        cursor.execute(sql)
        db.commit()
    except:
        db.rollback()

db.close()
