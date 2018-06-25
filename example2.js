var entities, relationships;
//var url = 'http://open-ed-graph-dev.us-east-1.elasticbeanstalk.com/api/mapping?domainId=593026b4734d1d5068f21e9d&entities=SUBJECT&entities=DEPARTMENT&entities=OUTCOME&relationships=HAS_PREREQUISITE_OF&relationships=HAS_PARENT_OF';
//var url = 'http://open-ed-graph.aeizqnc7mw.us-east-1.elasticbeanstalk.com/api/mapping?domainId=593026b4734d1d5068f21e9d&entities=SUBJECT&entities=DEPARTMENT&entities=OUTCOME&relationships=HAS_PREREQUISITE_OF&relationships=HAS_PARENT_OF';
var url = 'http://localhost:3000/api/v1/users'

var getDataPromise = $.ajax(url);

let school = {
  id: '500000000',
  type: 'SCHOOL',
  displayName: 'ENG'
}

// =====
// instantiate a new Xoces widget
// ========
$.when(getDataPromise)
.done(function(data) {
  var btn = document.createElement("BUTTON");        // Create a <button> element
  var t = document.createTextNode("Switch to Theme view");       // Create a text node
  btn.appendChild(t);                                // Append the text to <button>
  document.body.insertBefore(btn, document.getElementById("testing"));                    // Append <button> to <body>
  
  var click = 0;
  
  btn.onclick = function(){
	  
	if (click == 0){
		cwT.render({
			container: 'testing'
		});
		click = 1;
		btn.innerText = "Switch to Year view";
	}else {
		
		cwY.render({
			container: 'testing'
		});
		click = 0;
		btn.innerText = "Switch to Theme view";
		
	}
	
  }

  console.log('done', data);
  var entities = data.entities;
  var relationships = data.relationships.other;
  var relationshipsT = data.relationships.theme;
  var relationshipsY = data.relationships.year;

  entities = _.filter(entities, e => e );
  relationships = _.filter(relationships, r => {
    let source = _.find(entities, {id: r.sourceId})
    let target = _.find(entities, {id: r.targetId})

    return source && target;
  })
  relationshipsT = _.filter(relationshipsT, r => {
    let source = _.find(entities, {id: r.sourceId})
    let target = _.find(entities, {id: r.targetId})

    return source && target;
  })
  relationshipsY = _.filter(relationshipsY, r => {
    let source = _.find(entities, {id: r.sourceId})
    let target = _.find(entities, {id: r.targetId})

    return source && target;
  })
  relationshipsT = relationshipsT.concat(relationships);
  relationshipsY = relationshipsY.concat(relationships);

  var parentType = 'HAS_PARENT_OF';

  var schoolRelationships = _.map(_.filter(entities, {type: 'DEGREE'}), e => {
    return {
      id: _.uniqueId(),
      sourceId: e.id,
      targetId: school.id,
      type: parentType
    }
  })

  console.log('degrees', _.filter(entities, {type: 'DEGREE'}))
  console.log('year', _.filter(entities, {type: 'YEAR'}))
  console.log('course', _.filter(entities, {type: 'COURSE'}))
  //console.log('outcomes', _.filter(entities, {type: 'OUTCOME'}))
  console.log('relationships', relationships);

  var cwT = xoces.widgets.XocesWidget.new({
    hierarchy: ['SCHOOL', 'DEGREE', 'THEME', 'COURSE', 'OUTCOME'],
    data: {
      entities: entities.concat(school),
      relationships: relationshipsT.concat(schoolRelationships)
    },
    view: 'CHORD_VIEW',
    currentLevelEntity: "501000000",
    view: 'TREE_VIEW',
    entityLabelKey: 'displayName',
    nodeLabelKey: 'displayName',
    relationship: {
      parentType: parentType,
      sourceRef: 'sourceId',
      targetRef: 'targetId',
    },
    width: '100%',
    height: 1250,
    colorScheme: 'light',
    limitToSameParentInTree: false,
    onMouseOverDirection: 'both',
    onMouseOverFinish: function(data) {
    },
    onMouseOutFinish: function() {
    },
    onClickFinish: function(data) {
    }
  });
  
  var cwY = xoces.widgets.XocesWidget.new({
    hierarchy: ['SCHOOL', 'DEGREE', 'YEAR', 'COURSE', 'OUTCOME'],
    data: {
      entities: entities.concat(school),
      relationships: relationshipsY.concat(schoolRelationships)
    },
    view: 'CHORD_VIEW',
    currentLevelEntity: "501000000",
    view: 'TREE_VIEW',
    entityLabelKey: 'displayName',
    nodeLabelKey: 'displayName',
    relationship: {
      parentType: parentType,
      sourceRef: 'sourceId',
      targetRef: 'targetId',
    },
    width: '100%',
    height: 1250,
    colorScheme: 'light',
    limitToSameParentInTree: false,
    onMouseOverDirection: 'both',
    onMouseOverFinish: function(data) {
    },
    onMouseOutFinish: function() {
    },
    onClickFinish: function(data) {
    }
  });

  // render it into the specified container
  cwY.render({
    container: 'testing'
  });
  

})