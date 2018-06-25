import MySQLdb

db = MySQLdb.connect("localhost","root","root","courses")
cursor = db.cursor()

file1 = open("mech.csv", "r")

for line in file1:
    line = line.strip()
    new = line.replace("ENG","502") + "00"
    try:
        sql = "INSERT INTO `courses`.`newcourses` (`courseId`,`newId`) VALUES ('"+line+"', '"+new+"');"
        cursor.execute(sql)
        db.commit()
    except:
        db.rollback()

db.close()
