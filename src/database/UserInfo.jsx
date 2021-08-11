import { extendObservable } from "mobx";

class UserInfo {
    constructor() {
        extendObservable(this, { 
            username: ''
            
        });
    }
}
export default new UserInfo();