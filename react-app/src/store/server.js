const GET_ALL_SERVERS = 'server/GET_ALL_SERVERS';
const ADD_SERVER = 'server/ADD_SERVER';
const DELETE_A_SERVER = 'server/DELETE_A_SERVER';
const EDIT_A_SERVER = 'server/EDIT_A_SERVER';
const GET_CHANNELS_TO_SERVER = 'channel/GET_CHANNELS_TO_SERVER'

const getAllServersAC = (servers) => ({
    type: GET_ALL_SERVERS,
    payload: servers
}) 

const addServerAC = (serverInformation) => ({
  type: ADD_SERVER,
  payload: serverInformation
})

const deleteAServerAC = (serverId) => ({
  type: DELETE_A_SERVER,
  payload: serverId
})

const editAServerAC = (serverInformation) => ({
  type: EDIT_A_SERVER,
  payload: serverInformation
})

const getChannelsToServerAC = (channels) => ({
  type: GET_CHANNELS_TO_SERVER,
  payload: channels
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
    return data;
  } else if (response.status < 500) { 
    const data = await response.json();
  if (data.errors) {
    return data;
  }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const deleteAServer = (serverId) => async(dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method:"DELETE"})
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteAServerAC(serverId))
    return data;
  } else if (response.status < 500) { 
    const data = await response.json();
  if (data.errors) {
    return data;
  }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const editAServer = (serverInformation, serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(serverInformation)})
    if (response.ok) {
      const data = await response.json();
      dispatch(editAServerAC(data))
      return data;
    } else if (response.status < 500) { 
      const data = await response.json();
    if (data.errors) {
      return data;
    }
    } else {
      return ['An error occurred. Please try again.']
    }
} 

export const getChannelsToServer = (serverId) => async (dispatch) => {
  const response = await fetch('/api/servers/')
}
export default function reducer(state = {} , action) {
    let newState;
    let serverId;
    switch(action.type){
        case GET_ALL_SERVERS:
          newState = {...state}
          action.payload.forEach((singleServer) => newState[singleServer.id] = singleServer)
          return newState;
        case ADD_SERVER:
          newState = {...state}
          newState[action.payload.id] = action.payload
          return newState;
        case DELETE_A_SERVER:
          newState = {...state}
          delete newState[action.payload] 
          return newState;
        case EDIT_A_SERVER:
          newState = {...state}
          newState[action.payload.id] = action.payload
          return newState;
          default:
            return state
    }
} 
