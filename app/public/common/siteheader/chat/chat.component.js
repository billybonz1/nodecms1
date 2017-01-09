import template from './chat.html';
import ChatController from './chat.controller';

export const ChatComponent = {
    restrict: 'E',
    scope: {},
    template,
    ChatController,
    controllerAs: 'chat'
};