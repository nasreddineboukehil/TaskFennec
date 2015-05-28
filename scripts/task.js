'use strict';

app.controller('TaskController', function($scope, $firebase, FURL, $location, $routeParams) {
  var ref      = new Firebase(FURL);
  var fbTasks  = $firebase(ref.child('task')).$asArray();
  var taskId   = $routeParams.taskId;

  $scope.tasks = fbTasks;


  if (taskId) {
    $scope.selectedTask = getTask(taskId);
  }
  function getTask(taskId) {
    return $firebase(ref.child('tasks').child(taskId)).$asObject();
  }

  $scope.updateTask = function(task) {
    $scope.selectedTask.$save(task);
    $location.path('/browse')
  }


  $scope.postTask = function(task) {
    fbTasks.$add(task);
    $location.path('/browse')
  }
});