class DescController {
    constructor($http,$rootScope,$cookies,$element){
       'ngInject';
       this.$http = $http;
       this.$rootScope = $rootScope;
       this.$cookies = $cookies;
    }

    descForm(boolean){
        if(boolean){
            this.newDesc = this.desc;
        }
        this.DescActive = boolean;
    }

    descSave(){
        this.$http({
            method: 'POST',
            url: '/api/updateUserDescription',
            headers: {
                'Authorization': this.$rootScope.token
            },
            data: {
                desc: this.newDesc
            }
        }).success((response) => {
            this.desc = response;
            this.newDesc = response;
            this.DescActive = false;
        });
    }
}

export default DescController;
