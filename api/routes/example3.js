'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var entities, relationships;
//var url = 'http://open-ed-graph-dev.us-east-1.elasticbeanstalk.com/api/mapping?domainId=593026b4734d1d5068f21e9d&entities=SUBJECT&entities=DEPARTMENT&entities=OUTCOME&relationships=HAS_PREREQUISITE_OF&relationships=HAS_PARENT_OF';
//var url = 'http://open-ed-graph.aeizqnc7mw.us-east-1.elasticbeanstalk.com/api/mapping?domainId=593026b4734d1d5068f21e9d&entities=SUBJECT&entities=DEPARTMENT&entities=OUTCOME&relationships=HAS_PREREQUISITE_OF&relationships=HAS_PARENT_OF';
var url = 'http://18.191.183.26/data';

var getDataPromise = $.ajax(url);

var school = {
  id: '500000000',
  type: 'SCHOOL',
  displayName: 'ENG'

  // =====
  // instantiate a new Xoces widget
  // ========
};$.when(getDataPromise).done(function (data) {
  var _xoces$widgets$XocesW, _xoces$widgets$XocesW2;

  var btn = document.createElement("BUTTON"); // Create a <button> element
  var t = document.createTextNode("Switch to Theme view"); // Create a text node
  btn.appendChild(t); // Append the text to <button>
  document.body.insertBefore(btn, document.getElementById("testing")); // Append <button> to <body>

  var click = 0;

  btn.onclick = function () {

    if (click == 0) {
      cwT.render({
        container: 'testing'
      });
      click = 1;
      btn.innerText = "Switch to Year view";
    } else {

      cwY.render({
        container: 'testing'
      });
      click = 0;
      btn.innerText = "Switch to Theme view";
    }
  };

  console.log('done', data);
  var entities = data.entities;
  var relationships = data.relationships.other;
  var relationshipsT = data.relationships.theme;
  var relationshipsY = data.relationships.year;

  entities = _.filter(entities, function (e) {
    return e;
  });
  relationships = _.filter(relationships, function (r) {
    var source = _.find(entities, { id: r.sourceId });
    var target = _.find(entities, { id: r.targetId });

    return source && target;
  });
  relationshipsT = _.filter(relationshipsT, function (r) {
    var source = _.find(entities, { id: r.sourceId });
    var target = _.find(entities, { id: r.targetId });

    return source && target;
  });
  relationshipsY = _.filter(relationshipsY, function (r) {
    var source = _.find(entities, { id: r.sourceId });
    var target = _.find(entities, { id: r.targetId });

    return source && target;
  });
  relationshipsT = relationshipsT.concat(relationships);
  relationshipsY = relationshipsY.concat(relationships);

  var parentType = 'HAS_PARENT_OF';

  var schoolRelationships = _.map(_.filter(entities, { type: 'DEGREE' }), function (e) {
    return {
      id: _.uniqueId(),
      sourceId: e.id,
      targetId: school.id,
      type: parentType
    };
  });

  console.log('degrees', _.filter(entities, { type: 'DEGREE' }));
  console.log('year', _.filter(entities, { type: 'YEAR' }));
  console.log('course', _.filter(entities, { type: 'COURSE' }));
  //console.log('outcomes', _.filter(entities, {type: 'OUTCOME'}))
  console.log('relationships', relationships);

  var cwT = xoces.widgets.XocesWidget.new((_xoces$widgets$XocesW = {
    hierarchy: ['SCHOOL', 'DEGREE', 'THEME', 'COURSE', 'OUTCOME'],
    data: {
      entities: entities.concat(school),
      relationships: relationshipsT.concat(schoolRelationships)
    },
    view: 'CHORD_VIEW',
    currentLevelEntity: "501000000"
  }, _defineProperty(_xoces$widgets$XocesW, 'view', 'TREE_VIEW'), _defineProperty(_xoces$widgets$XocesW, 'entityLabelKey', 'displayName'), _defineProperty(_xoces$widgets$XocesW, 'nodeLabelKey', 'displayName'), _defineProperty(_xoces$widgets$XocesW, 'relationship', {
    parentType: parentType,
    sourceRef: 'sourceId',
    targetRef: 'targetId'
  }), _defineProperty(_xoces$widgets$XocesW, 'width', '100%'), _defineProperty(_xoces$widgets$XocesW, 'height', 1250), _defineProperty(_xoces$widgets$XocesW, 'colorScheme', 'light'), _defineProperty(_xoces$widgets$XocesW, 'limitToSameParentInTree', false), _defineProperty(_xoces$widgets$XocesW, 'onMouseOverDirection', 'both'), _defineProperty(_xoces$widgets$XocesW, 'onMouseOverFinish', function onMouseOverFinish(data) {}), _defineProperty(_xoces$widgets$XocesW, 'onMouseOutFinish', function onMouseOutFinish() {}), _defineProperty(_xoces$widgets$XocesW, 'onClickFinish', function onClickFinish(data) {}), _xoces$widgets$XocesW));

  var cwY = xoces.widgets.XocesWidget.new((_xoces$widgets$XocesW2 = {
    hierarchy: ['SCHOOL', 'DEGREE', 'YEAR', 'COURSE', 'OUTCOME'],
    data: {
      entities: entities.concat(school),
      relationships: relationshipsY.concat(schoolRelationships)
    },
    view: 'CHORD_VIEW',
    currentLevelEntity: "501000000"
  }, _defineProperty(_xoces$widgets$XocesW2, 'view', 'TREE_VIEW'), _defineProperty(_xoces$widgets$XocesW2, 'entityLabelKey', 'displayName'), _defineProperty(_xoces$widgets$XocesW2, 'nodeLabelKey', 'displayName'), _defineProperty(_xoces$widgets$XocesW2, 'relationship', {
    parentType: parentType,
    sourceRef: 'sourceId',
    targetRef: 'targetId'
  }), _defineProperty(_xoces$widgets$XocesW2, 'width', '100%'), _defineProperty(_xoces$widgets$XocesW2, 'height', 1250), _defineProperty(_xoces$widgets$XocesW2, 'colorScheme', 'light'), _defineProperty(_xoces$widgets$XocesW2, 'limitToSameParentInTree', false), _defineProperty(_xoces$widgets$XocesW2, 'onMouseOverDirection', 'both'), _defineProperty(_xoces$widgets$XocesW2, 'onMouseOverFinish', function onMouseOverFinish(data) {}), _defineProperty(_xoces$widgets$XocesW2, 'onMouseOutFinish', function onMouseOutFinish() {}), _defineProperty(_xoces$widgets$XocesW2, 'onClickFinish', function onClickFinish(data) {}), _xoces$widgets$XocesW2));

  // render it into the specified container
  cwY.render({
    container: 'testing'
  });
});