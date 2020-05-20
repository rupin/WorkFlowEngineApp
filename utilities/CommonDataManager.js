export default class CommonDataManager {

    static myInstance = null;

    _token = "";

    _baseURL="https://flowengine.herokuapp.com"
    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }

        return this.myInstance;
    }
    getBaseURL()
    {
        return this._baseURL;
    }

    getToken() {
        return this._token;
    }

    setToken(token) {
        this._token = token;
    }
}