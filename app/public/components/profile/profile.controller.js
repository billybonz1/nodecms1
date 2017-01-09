class ProfileController {
    constructor($http,$stateParams,Upload,$rootScope,$cookies){
       'ngInject';
       this.$http = $http;
       this.Upload = Upload;
       this.$rootScope = $rootScope;
       this.$stateParams = $stateParams;
       this.user = {};
       this.$cookies = $cookies;
       this.oneLineStoryActive = false;
    }



    getUser(){
      var username = this.$stateParams.username;
      this.$http({
        method: 'GET',
        url: "/api/user/" + username
      }).success((response) => {
        if(response.success == false){
          window.location.href = "#/";
        }
        this.user = response;
      });
    }

    checkMyProfile(){
      if(this.user.username){
        return this.$cookies.get('username') === this.user.username;
      }
    }

    upload(file) {
      if(file){
        this.Upload.upload({
            url: '/api/uploadAvatar',
            headers: {
                'Authorization': this.$rootScope.token
            },
            data: {file: file}
        }).then((resp) => {
            this.user.avatar = resp.data;
            this.$rootScope.avatar = this.user.avatar;
        },(resp) => {
            console.log('Error status: ' + resp.status);
        },(evt) => {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
      }
    };

    onLineStoryEdit(boolean){
      this.oneLineStory = this.user.oneLineStory ? this.user.oneLineStory : "";
      this.oneLineStoryActive = boolean;
      if(boolean){
        this.oneLineStoryFocus = true;
      }else{
        this.oneLineStoryFocus = false;
      }
    }

    onLineStorySave(){
      this.$http({
        method: 'POST',
        url: '/api/updateOneLineStory',
        headers: {
          'Authorization': this.$rootScope.token
        },
        data: {
          oneLineStory: this.oneLineStory
        }
      }).success((response) => {
          this.oneLineStoryActive = false;
          this.user.oneLineStory = response;
          this.oneLineStoryFocus = false;
      });
    }
}

export default ProfileController;
