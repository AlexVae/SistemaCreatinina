var RegistroConsultaApp = angular.module('RegistroConsultaApp', ['dx']);
RegistroConsultaApp.controller('RegistroConsultaController', function DemoController($scope,$http) {


    var Schetch =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GetAllAppointInfo",
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // disableLoader();
                     //console.log(response.data);
                    return { data: response.data };
                }, function (response) {
                    //disableLoader();
                    //return $q.reject("Data Loading Error");
                });
        },
        remove: function (key) {
            DeleteProduct(key);
        }
    });
   $scope.editing = {
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        allowResizing: true,
        allowDragging: true
    };
  $scope.schedulerOptions = {
        dataSource: Schetch,
        views: ["day", "week"],
        currentView: "week",
       
        bindingOptions: {
            editing: "editing",
        },
        height: 400
    };

});