export class ActionState {

    private static actionName = '';


    public static changeAction(actionName: string) {
        this.actionName = actionName;
    }

    public static getActionName() {
        return this.actionName;
    }

}
