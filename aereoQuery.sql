SELECT aereo.newId as id,course.displayName, course.type FROM courses.aero AS aereo, courses.course AS course
WHERE aereo.id=course.id;