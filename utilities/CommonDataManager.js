export default class CommonDataManager {

    static myInstance = null;

    _token = null;

    _baseURL="https://flowengine.herokuapp.com"
    

    _headers={}
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

    getHeaders()
    {
       this._headers["Accept"] ='application/json'
       this._headers["Content-Type"] ='application/json'
       if(this._token)
       {
        this._headers["Authorization"] ="Token "+ this._token
       }
       return this._headers
      //console.log(this._headers)
    }
}