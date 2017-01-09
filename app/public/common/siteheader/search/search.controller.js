class SearchController {
    constructor($http,$rootScope,$cookies,$timeout){
       'ngInject';
       this.$http = $http;
       this.$timeout = $timeout;
       this.promise = "";
       this.results = [];
       this.s = "";
       this.loader = false;
       $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
         this.s = "";
         this.results = [];
       });
    }

    searchSteps($event){
      this.loader = true;
      if($event.target.value != ""){

        if(this.promise){
          this.$timeout.cancel(this.promise);
        }
        this.promise = this.$timeout(() => {

          this.$http({
            method: 'POST',
            url: '/api/search',
            data: {
              s: $event.target.value
            }
          }).success((response) => {
              console.log(response);
              this.results = response;
              this.loader = false;
          });

        }, 200);
      }else{
        if(this.promise){
          this.$timeout.cancel(this.promise);
          this.results = [];
          this.loader = false;
        }
      }
    }


    clearSearch(){
      this.s = "";
      this.results = [];
    }

}


export default SearchController;
