const GET_ALL_SERVERS = 'server/GET_ALL_SERVERS';
const ADD_SERVER = 'server/ADD_SERVER'

const getAllServersAC = (servers) => ({
    type: GET_ALL_SERVERS,
    payload: servers
}) 

const addServerAC = (serverInformation) => ({
  type: ADD_SERVER,
  payload: serverInformation
})

export const getAllServers = () => async (dispatch) => {
  const response = await fetch('/api/servers/');
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllServersAC(data.servers))
    return data.servers;
  } else if (response.status < 500) { 
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const addServer = (serverInformation) => async(dispatch) => {
  const response = await fetch('/api/servers/', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(serverInformation)})
  if (response.ok) {
    const data = await response.json();
    dispatch(addServerAC(data))
    return data.servers;
  } else if (response.status < 500) { 
    const data = await response.json();
  if (data.errors) {
    return data.errors;
  }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = {}, action) {
    let newState;
    let serverId;
    switch(action.type){
        case GET_ALL_SERVERS:
            newState = {...state}
            action.payload.forEach((singleServer) => newState[singleServer.id] = singleServer)
            return newState;
        case ADD_SERVER:
          newState = {...state}

          return newState;
        default:
            return state
    }
} 