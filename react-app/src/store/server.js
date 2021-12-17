const GET_ALL_SERVERS = 'server/GET_SERVERS';

const getAllServersAC = (servers) => ({
    type: GET_ALL_SERVERS,
    payload: servers
}) 

export const getAllServers = () => async (dispatch) => {
    const response = await fetch('/api/servers');
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllServersAC(data))
        return data;
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

let initialState = {}

const reducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ALL_SERVERS:
            newState = {...state}
            return newState;
        default:
            return state
    }
} 