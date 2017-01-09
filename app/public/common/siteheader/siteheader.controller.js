class siteheaderController {
    constructor($http,$rootScope,$cookies){
       'ngInject';
       this.logout = function(){
          console.log('logout');
          $cookies.remove('token');
          $rootScope.token = null;
          $cookies.remove('username');
          $rootScope.username = null;
          $cookies.remove('userID');
          $rootScope.userID = null;
          $cookies.remove('avatar');
          $rootScope.avatar = null;
          window.location.href = "#/";
       }
       this.$rootScope = $rootScope;
       this.$http = $http;

    }

    getUser(){

      var username = this.$rootScope.username;
      this.$http({
        method: 'GET',
        url: "/api/user/" + username
      }).success((response) => {
        this.user = response;
        this.$rootScope.avatar = this.user.avatar;
      });
    }
}


export default siteheaderController;
