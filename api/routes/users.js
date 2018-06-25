var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
/* GET users listing. */
router.get('/', function(req, res, next) {
	
	
	var connection = mysql.createConnection({
		host : 'localhost',
		port : '3306',
		user     : 'root',
		password : 'root',
		database : 'courses',
	});

	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}

		console.log('connected as id ' + connection.threadId);
	});
	
	var courses = {
		entities : [],
		relationships: {
			theme: [],
			year: [],
			other: []
		}
	};
	
	var relationships;
	connection.query('SELECT * FROM entities', function (error, results, fields) {
		if (error) throw error;
			setEntities(results);
		});
		
	connection.query('SELECT new.newId as id,course.displayName, course.type FROM courses.newcourses AS new, courses.course AS course WHERE new.id=course.id;', function (error, results, fields) {
		if (error) throw error;
			addEntities(results);
		});
		
	connection.query('SELECT REPLACE(newc.newId,\'00\',outcome.outcomeNum) as id, outcome.displayName, \'OUTCOME\' as type  FROM courses.newcourses AS newc, courses.outcomes AS outcome WHERE newc.courseId=outcome.courseId;', function (error, results, fields) {
		if (error) throw error;
			addEntities(results);
		});
	connection.query('SELECT * FROM relationships', function (error, results, fields) {
		if (error) throw error;
			setRelationshipsOther(results);
		});
	connection.query('SELECT id,sourceId,targetId,type,displayName,directionality FROM courselinks WHERE courselinks.typeLink=\'THEME\'', function (error, results, fields) {
		if (error) throw error;
			setRelationshipsTheme(results);
		});
	connection.query('SELECT id,sourceId,targetId,type,displayName,directionality FROM courselinks WHERE courselinks.typeLink=\'YEAR\'', function (error, results, fields) {
		if (error) throw error;
			setRelationshipsYear(results);
		});
	connection.query('SELECT REPLACE(newc.newId,\'00\',outcomes.outcomeNum) as sourceId, newc.newId as targetId,\'DIRECTED\' as directionality, \'HAS_PARENT_OF\' as type FROM courses.newcourses AS newc, courses.outcomes WHERE newc.courseId=outcomes.courseId;', function (error, results, fields) {
		if (error) throw error;
			addRelationshipsOther(results);
		});
	connection.query('SELECT REPLACE(newc.newId,\'00\',outc.outcomeNum) as sourceId, CONCAT(left(newc.newId, 3), right(outlink.targetId, 6)) as targetId,\'DIRECTED\' as directionality, outlink.type FROM courses.newcourses AS newc, courses.outcomes as outc, courses.outcomelinks as outlink WHERE newc.courseId=outc.courseId AND outc.id=outlink.sourceId;', function (error, results, fields) {
		if (error) throw error;
			addRelationshipsOther(results);
		});	
	
	function addEntities(entities){
		courses.entities = courses.entities.concat(entities)
	}
	
	function setEntities(entities){
		courses.entities = entities;
	}
	function setRelationshipsOther(relationships){
		courses.relationships.other = relationships;
	}
	function addRelationshipsOther(relationships){
		courses.relationships.other = courses.relationships.other.concat(relationships);
	}
	function setRelationshipsTheme(relationships){
		courses.relationships.theme = relationships;
	}
	function addRelationshipsTheme(relationships){
		courses.relationships.theme = courses.relationships.theme.concat(relationships);
	}
	function setRelationshipsYear(relationships){
		courses.relationships.year = relationships;
	}
	function addRelationshipsYear(relationships){
		courses.relationships.year = courses.relationships.Year.concat(relationships);
	}
	
	
	connection.end(function(){res.send(courses);});
	
	});
module.exports = router;
