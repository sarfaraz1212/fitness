export default interface ActionInterface {
   execute(payload: object): Promise<any>;
}
