var app = angular.module('guilhermeFront', ['angularUtils.directives.dirPagination', 'ui.mask'])

    .controller('ListaCarrosController', function($scope, $filter){

        $scope.item = {};
        $scope.form = false;
        $scope.indexEdit = null;

        $scope.items = [ 
            { combustivel : "Flex", imagem : null, marca : "Volkswagem", modelo : "Gol", placa : "FFF-5498", valor : "20000", checked: false}, 
            { combustivel : "Gasolina", imagem : null, marca : "Volkswagem", modelo : "Fox", placa : "FOX-4125", valor : "20000", checked: false}, 
            { combustivel : "Alcool", imagem : "http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg", marca : "Volkswagen", modelo : "Fusca", placa : "PAI-4121", valor : "20000", checked: false},
        ];

        $scope.createCar = function () {
            $scope.items.unshift({
                combustivel: $scope.item.combustivel, 
                imagem: $scope.item.imagem, 
                marca: $scope.item.marca, 
                modelo: $scope.item.modelo, 
                placa: $scope.item.placa, 
                valor: $scope.item.valor
            });
            toastr.success("Item adicionado com sucesso.");
            $scope.form = false;
        };

        $scope.openForm = function(){
            $scope.form = true;
        };

        $scope.applyChanges = function(index){
            $scope.item = {};
            $scope.edit = false;
            $scope.delete = false;
            $scope.form = false;
            toastr.success("Item alterado com sucesso.");
        };

        $scope.changeCheckbox = function(index){
            $scope.indexItem = index;
            $scope.item = $scope.items[$scope.indexItem];
            $scope.checkedItens();
        };

        $scope.checkedItens = function(){
            var count = 0;
            angular.forEach($scope.items, function (item) {
                if(item.checked){
                    count++;
                }
            });

            if(count == 1){
                $scope.edit = true;
                $scope.delete = true;
            }else if( count > 1){
                $scope.edit = false;
                $scope.delete = true;
            }else{
                $scope.edit = false;
                $scope.delete = false;
            }
        }

        $scope.editItem = function(){
            $scope.openForm();
            $scope.item = $scope.items[$scope.indexItem];
        };

        $scope.deleteItens = function(){
            $scope.items = $filter('filter')($scope.items, {checked : false});
            $scope.checkedItens();
            toastr.error("Item(s) removido(s) com sucesso.");
        };

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.items, function (item) {
                item.checked = $scope.selectedAll;
                if(item.checked){
                    $scope.changeCheckbox(item)
                }
            });
            $scope.checkedItens();
        };
 
    });
