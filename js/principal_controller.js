main = angular.module('principal',['ui.bootstrap']).config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/inicio', {templateUrl: 'views/main.html'}).
	when('/canchas', {templateUrl: 'views/canchas.html'}).
	when('/encuentro', {templateUrl: 'views/encuentro.html'}).
	otherwise({redirectTo: 'inicio'});
}]).config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]).config(['$dialogProvider',function($dialogProvider){
	 $dialogProvider.options({backdrop:false, dialogFade: true});
}]);

function menuCtrl($scope){
	$scope.active_seccion=document.URL;
	$scope.set_active=function(seccion){
		$scope.active_seccion=seccion;
		console.log($scope.active_seccion);
	};
	$scope.active=function(seccion){
		if($scope.active_seccion.indexOf(seccion)!=-1){ return "active"; console.log(seccion); }
		else return "";
	};
}
function canchasCtrl($scope){
	$scope.canchas=[{"Nombre":"  Club Paihuen ","Comuna":"Chicureo","Direccion":"Calle Los Pimientos","Material":"Pasto Sintético","Iluminada":"Sí","Techada":"","Numero_de_canchas":5,"Tipo_de_cancha":"6x6 8x8","Precio":"18000","Teléfono":"","Correo_Electronico":"","Pagina_web":""},
{"Nombre":"  Futbolito San Carlos de Apoquindo ","Comuna":"Las Condes","Direccion":"Camino Las Flores 13000","Material":"Pasto Sintético","Iluminada":"Sí","Techada":"","Numero_de_canchas":7,"Tipo_de_cancha":"Futbolito","Precio":"18000","Teléfono":"","Correo_Electronico":"","Pagina_web":""},
{"Nombre":" Balneario La Florida ","Comuna":"La Florida","Direccion":"Alonso de Ercilla 1270","Material":"Cemento","Iluminada":"Sí","Techada":"Sí","Numero_de_canchas":1,"Tipo_de_cancha":"5x5 ","Precio":"20000-33000","Teléfono":"2412 4780 /     2412 4781","Correo_Electronico":"futbolito@cduc.cl","Pagina_web":"www.lacatolica.cl/futbolito"},
{"Nombre":"Club Palestino ","Comuna":"Las Condes","Direccion":"Avenida Kennedy 9352","Material":"","Iluminada":"","Techada":"","Numero_de_canchas":null,"Tipo_de_cancha":"","Precio":"25000","Teléfono":"","Correo_Electronico":"","Pagina_web":""},
{"Nombre":"Dragones de La Reina ","Comuna":"La Reina","Direccion":"Francisco Villagra 6681","Material":"","Iluminada":"","Techada":"","Numero_de_canchas":null,"Tipo_de_cancha":"","Precio":"","Teléfono":"","Correo_Electronico":"","Pagina_web":""},
{"Nombre":"Complejo Soccer Pro","Comuna":"Ñuñoa","Direccion":"Francisco Meneses 1580","Material":"Pasto Sintético","Iluminada":"Sí","Techada":"No","Numero_de_canchas":7,"Tipo_de_cancha":"Futbolito","Precio":"20000-38000","Teléfono":"2237 90 26","Correo_Electronico":"arriendos@soccerpro.cl","Pagina_web":"www.soccerpro.cl"},
{"Nombre":"Club Futbol 7 Vespucio","Comuna":"La Florida","Direccion":"Serafín Zamora 127","Material":"Pasto Sintético","Iluminada":"Sí","Techada":"No","Numero_de_canchas":4,"Tipo_de_cancha":"Futbolito, Baby fútbol","Precio":"18000-35000","Teléfono":"2294 9714 /     7 699 7183","Correo_Electronico":"mpv@elclubfutbol7.cl","Pagina_web":"www.elclubfutbol7.cl"},
{"Nombre":"Club Futbol 7 Norte","Comuna":"Huechuraba","Direccion":"Calle Nueva 1692","Material":"Pasto Sintético","Iluminada":"Sí","Techada":"No","Numero_de_canchas":6,"Tipo_de_cancha":"Futbolito","Precio":"22000-32000","Teléfono":"2925 6670 /     7 792 9652","Correo_Electronico":"mpn@elclubfutbol7.cl","Pagina_web":"www.elclubfutbol7.cl"},
{"Nombre":"Club Futbol 7 Sur","Comuna":"San Bernardo","Direccion":"Avenida José Pedro Alessandri 20040","Material":"Pasto Sintético","Iluminada":"Sí","Techada":"No","Numero_de_canchas":6,"Tipo_de_cancha":"Futbolito","Precio":"22000-30000","Teléfono":"2857 8251 /     7 850 1359","Correo_Electronico":"mps@elclubfutbol7.cl","Pagina_web":"www.elclubfutbol7.cl"},
{"Nombre":"Bora Futbol","Comuna":"Puente Alto","Direccion":"Camilo Henríquez 3527","Material":"Pasto Sintético","Iluminada":"","Techada":"","Numero_de_canchas":3,"Tipo_de_cancha":"Futbolito","Precio":"","Teléfono":"2419 1686","Correo_Electronico":"","Pagina_web":"www.borafutbol.cl"}];
}
main.factory("mensajeria", function($rootScope){
	var mensajes=[];
    return mensajes;
});

main.service("session",function(){
	
});

function loginCtrl($scope,$http,mensajeria){
	$scope.user=$.jStorage.get("user")?$.jStorage.get("user"):{};
	if($.jStorage.get("user")){
		$scope.recordar=true;
	}
	if($.cookie("session_key")){
		session_init();
		return;
	}
	else{
		$("#session-menu").hide();
	}
	$scope.login_try = function(){
		$http({method: 'POST', url: 'http://localhost:3000/users/login', data: {user:$scope.user}}).
		  success(function(data, status, headers, config) {
		    $.cookie("session_key", data.cookie, { expires: 1 });
		    mensajeria.push(data.msge);
		    console.log(data);
		    if(data.cookie!=null){
		    	session_init();
		    	if($scope.recordar){
		    		$.jStorage.set("user",$scope.user);
		    	}
		    	else{
		    		$.jStorage.deleteKey("user");
		    	}
		    }
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};
}
function sessionCtrl($scope,mensajeria){
	$scope.session_close = function(){
		$.cookie("session_key","",{expires:0});
		location.href="#inicio"
		location.reload();
	};
}
function mensajesCtrl($scope,mensajeria){
	$scope.mensajes=[];
	$scope.$watch('mensajeria', function() {
        $scope.mensajes=mensajeria;
    });
    $scope.closeAlert = function(index) {
    $scope.mensajes.splice(index, 1);
    mensajeria.splice(index, 1);
 };
}
function session_init(){
	$("#login-form").hide();
	$("#session-menu").show();
}
function session_close(){
}