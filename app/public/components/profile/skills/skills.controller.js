class SkillsController {
    constructor($http,$stateParams,$rootScope,$cookies,$timeout){
       'ngInject';
       this.$http = $http;
       this.$rootScope = $rootScope;
       this.$stateParams = $stateParams;
       this.$cookies = $cookies;
       this.addSkillActive = false;
       this.editSkillActive = false;
       this.newSkill = {};
       this.editSkill = {};
       this.index = "";
       this.$timeout = $timeout;
    }


    addSkill(){
      console.log(this.skills.length);
      this.$http({
        method: 'POST',
        url: '/api/addSkill',
        headers: {
          'Authorization': this.$rootScope.token
        },
        data: {
          skills: this.skills.length > 0 ? this.skills : [],
          newSkill: this.newSkill
        }
      }).success((response) => {
        console.log(response);
        this.addSkillActive = false;
        this.skills = response;
        this.newSkill = {};
      });
    }


    updateForm($event){
      this.editSkill.key = $event.target.dataset.key;
      this.editSkill.label = this.skills[this.editSkill.key].label;
      this.editSkill.level = this.skills[this.editSkill.key].level;
      this.editSkillActive = true;
    }


    updateSkill(){
      this.skills[this.editSkill.key].label = this.editSkill.label;
      this.skills[this.editSkill.key].level = this.editSkill.level;

      this.$http({
        method: 'POST',
        url: '/api/updateSkill',
        headers: {
          'Authorization': this.$rootScope.token
        },
        data: {
          skills: this.skills
        }
      }).success((response) => {
        this.skills = response;
        this.editSkill = {};
        this.editSkillActive = false;
        console.log(this.skills);
      });
    }



    deleteSkill($event){
      this.index = $event.target.dataset.key;
      this.$http({
        method: 'POST',
        url: '/api/deleteSkill',
        headers: {
          'Authorization': this.$rootScope.token
        },
        data: {
          index: this.index,
          skills: this.skills
        }
      }).success((response) => {
        this.skills = response;
        console.log(this.skills);
      });
    }


    searchSkills($event){
        this.loader = true;
        if($event.target.value != ""){

            if(this.promise){
                this.$timeout.cancel(this.promise);
            }
            this.promise = this.$timeout(() => {

                this.$http({
                    method: 'POST',
                    url: '/api/searchSkills',
                    data: {
                        label: $event.target.value
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

}

export default SkillsController;
