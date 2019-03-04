export class ActionState {
    actionName: string;
}


export class ActionStateStore {

    private static actonState: ActionState = new ActionState();


    public static changeAction(actionName: string) {
        this.actonState.actionName = actionName;
    }

    public static getActionName() {
        return this.actonState.actionName;
    }

}
