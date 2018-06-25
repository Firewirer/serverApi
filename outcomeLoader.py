import MySQLdb

db = MySQLdb.connect("localhost","root","root","courses")
cursor = db.cursor()

file1 = open("outcomes.csv", "r")

for line in file1:
    line = line.rstrip(',,\n')
    line = line.rstrip(',\n')
    line = line.rstrip('\n')
    info = line.split(",")
    desc = ""
    for i in range(2,len(info)):
        desc+=info[i]+','
    desc = desc.replace('"','')

    if int(info[1])<10:
        info[1] = "0"+info[1]
    try:
        sql = "INSERT INTO `courses`.`outcomes` (`courseId`, `outcomeNum`,`description`) VALUES ('"+info[0]+"', '"+info[1]+"', '"+desc[:-1]+"');"
        cursor.execute(sql)
        db.commit()
    except:
        db.rollback()
   

db.close()
