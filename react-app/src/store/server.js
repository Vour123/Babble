const GET_ALL_SERVERS = 'server/GET_SERVERS';

const getAllServersAC = (servers) => ({
    type: GET_ALL_SERVERS,
    payload: servers
}) 

export const getAllServers = () => async (dispatch) => {
  const response = await fetch('/api/servers/');
  if (response.ok) {
    const data = await response.json();
    console.log('this is the data', data)
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

export default function reducer(state = {}, action) {
    let newState;
    let serverId;
    switch(action.type){
        case GET_ALL_SERVERS:
            newState = {...state}
            action.payload.forEach((singleServer) => newState[singleServer.id] = singleServer)
            return newState;
        default:
            return state
    }
} 