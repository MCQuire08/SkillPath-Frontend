const baseURL = 'http://'
const server = 'localhost'
const port = ':3000'
const apiUrlPath = '/api'

export const API_ROUTES = {
    LOGIN: baseURL + server + port + apiUrlPath + '/login',
    CATEGORY: baseURL + server + port + apiUrlPath + '/category',
    COURSE: baseURL + server + port + apiUrlPath +'/course',
    PLAN: baseURL + server + port + apiUrlPath + '/plan',
    PLANEVIDENCE:baseURL + server + port + apiUrlPath + '/planEvidence',
    USER: baseURL + server + port + apiUrlPath + '/user'
  };
  