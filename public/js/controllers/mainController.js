'use strict';

(function() {

var app =  angular.module('kanban')


    .controller('MainController', ['$scope', '$document', '$http', 'IndexService', 'TaskService', 'dragulaService',
      function($scope, $http, $document, IndexService, TaskService, dragulaService) {

        $scope.toggleForm = function() {
          IndexService.toggleForm();
        };

        $scope.toggle = true;
        $scope.IndexService = IndexService;

        $scope.$on('formIsActive', function () {
          $scope.formIsActive = IndexService.formIsActive;
        });

        $scope.tasks = [];
        TaskService.getTasks().then(function(res) {
          $scope.tasks = res.data;
        });

        $scope.moveOnMax = function (field, nextFieldID) {
          console.log(field);
          // if (field.value.length >= field.maxLength) {
          //   nextFieldID.focus();
          //   }
          };

        $scope.joinMDY = function () {
          var mm = $document.getElementById('mm').value;
          console.log(mm);
          var dd = $document.getElementById('dd').value;
          console.log(dd);
            var yy = $document.getElementById('yy').value;
          console.log(yy);
            $document.getElementById('joint').value = mm+'/'+dd+'/'+yy;
          var date = ($document.getElementById('joint').value);
            console.log(date);
        };

        $scope.addTask = (function (res) {
        TaskService.addTask(res).then(function(res) {
          $scope.tasks.push(res.data);
        });
      });

       $scope.toggle = true;

        $scope.classChange = function() {
        var page = $document.getElementById('allPage');
        var className = page.getAttribute("class");
        if(className === "newTask-Up"){
          page.className = "newTask-Down";
        } else {
          page.className = "newTask-Up";
        }

    };
        $scope.editTask = function(id, field, update) {
        TaskService.editTask(id, field, update).then(function(res) {
          $scope.tasks = res.data;
          });
        };

        $scope.deleteTask = function(id) {
        TaskService.deleteTask(id).then(function(res) {
           $scope.tasks = res.data;
          });
        };

        $scope.$on('first-bag.drop', function (e, el) {
          var taskHTML = (el[0].innerHTML);
          var idStart = taskHTML.indexOf('@') + 1;
          var idEnd = taskHTML.indexOf('@', idStart);
          var id = taskHTML.substring(idStart, idEnd);

          var statusHTML = (el[0].parentNode.innerHTML);
          var statusStart = statusHTML.indexOf("{status: '") + 10;
          var statusEnd = statusHTML.indexOf("'", statusStart);
          var update = statusHTML.substring(statusStart, statusEnd);
          var field  = 'status';

          TaskService.editTask(id, 'status', update).then(function(res){
            $scope.tasks = res.data;
            console.log(res.data);
          })
          .catch(e);
    });
  }]);
})();

