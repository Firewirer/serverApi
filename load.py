import MySQLdb

db = MySQLdb.connect("localhost","root","root","courses")
cursor = db.cursor()

file1 = open("aero.csv", "r")

for line in file1:
    line = line.strip()
    source = line.replace("ENG","501") + "00"
    try:
        sql = "INSERT INTO `courses`.`newcourses` (`courseId`,`newId`) VALUES ('"+line+"', '"+source+"');"
        cursor.execute(sql)
        db.commit()
    except:
        db.rollback()

db.close()
