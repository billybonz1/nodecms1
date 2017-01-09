import angular from 'angular';
import { HomeModule } from './home/home.module';
import { TopServicesModule } from './topservices/topservices.module';
import { StepModule } from './step/step.module';
import { DetailStepModule } from './detailstep/detailstep.module';
import { LoginModule } from './login/login.module';
import { EditStepModule } from './editstep/editstep.module';
import { AddStepModule } from './addstep/addstep.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module';


export const ComponentsModule = angular
    .module('app.components', [
        HomeModule,
        TopServicesModule,
        StepModule,
        DetailStepModule,
        LoginModule,
        EditStepModule,
        AddStepModule,
        RegisterModule,
        ProfileModule,
        ChatModule
    ])
    .name;