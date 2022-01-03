const GET_ALL_SERVERS = 'server/GET_ALL_SERVERS';
const ADD_SERVER = 'server/ADD_SERVER';
const DELETE_A_SERVER = 'server/DELETE_A_SERVER';
const EDIT_A_SERVER = 'server/EDIT_A_SERVER';
const GET_CHANNELS_TO_SERVER = 'channel/GET_CHANNELS_TO_SERVER';
const ADD_CHANNEL_TO_SERVER = 'channel/ADD_CHANNEL_TO_SERVER';
const DELETE_CHANNEL_TO_SERVER = 'channel/DELETE_CHANNEL_TO_SERVER';
const UPDATE_CHANNEL_TO_SERVER = 'channel/UPDATE_CHANNEL_TO_SERVER';
const ADD_MEMBER_TO_SERVER = 'member/ADD_MEMBER_TO_SERVER';
const GET_ALL_MESSAGES = 'messages/GET_ALL_MESSAGES';
const POST_A_MESSAGE = 'messages/POST_A_MESSAGE';
const UPDATE_A_MESSAGE = 'messages/UPDATE_A_MESSAGE';
const DELETE_A_MESSAGE = 'messages/DELETE_A_MESSAGE';

export const getAllServersAC = (servers) => ({
    type: GET_ALL_SERVERS,
    payload: servers
}) 

export const addServerAC = (serverInformation) => ({
  type: ADD_SERVER,
  payload: serverInformation
})

export const deleteAServerAC = (serverId) => ({
  type: DELETE_A_SERVER,
  payload: serverId
})

export const editAServerAC = (serverInformation) => ({
  type: EDIT_A_SERVER,
  payload: serverInformation
})

export const getChannelsToServerAC = (channels, serverId) => ({
  type: GET_CHANNELS_TO_SERVER,
  payload: channels,
  serverId: +serverId
})

export const addChannelToServerAC = (channelInformation) => ({
  type: ADD_CHANNEL_TO_SERVER,
  payload: channelInformation
})

export const deleteChannelToServerAC = (channelId, serverId) => ({
  type: DELETE_CHANNEL_TO_SERVER,
  channelId,
  serverId
})

export const updateChannelToServerAC = (channelInformation, serverId, channelId) => ({
  type: UPDATE_CHANNEL_TO_SERVER,
  payload: channelInformation,
  serverId,
  channelId
})

export const addMemberToServerAC = (server) => ({
  type: ADD_MEMBER_TO_SERVER,
  server
})

export const getMessagesOfServerAC = (messages, serverId, channelId) => ({
  type: GET_ALL_MESSAGES,
  payload: messages,
  serverId,
  channelId
})

export const postMessageToServerAC = (messages, serverId) => ({
  type: POST_A_MESSAGE,
  payload: messages,
  serverId
})

export const updateAMessageAC = (messages, serverId) => ({
  type: UPDATE_A_MESSAGE,
  payload: messages,
  serverId
})

export const deleteAMessageAC = (messages) => ({
  type: DELETE_A_MESSAGE,
  payload: messages,
})


 
export const getAllServers = () => async(dispatch) => {
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
  const response = await fetch(`/api/servers/${serverId}/`, {
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
  const response = await fetch(`/api/servers/${serverId}/`, {
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
  const response = await fetch(`/api/servers/${serverId}/`)
  if (response.ok) {
    const data = await response.json();
    dispatch(getChannelsToServerAC(data.channels, serverId))
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

export const addChannelToServer = (channelInformation) => async (dispatch) => {
  const { specificServerId } = channelInformation
  const response = await fetch(`/api/servers/${specificServerId}/`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(channelInformation)})
    if (response.ok) {
      const data = await response.json();
      dispatch(addChannelToServerAC(data))
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

export const deleteChannelToServer = (serverId, channelId) => async(dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/${channelId}/`, {
    method:"DELETE"})
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteChannelToServerAC(channelId, serverId))
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

export const updateChannelToServer = (channelInformation, serverId, channelId) => async(dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/${channelId}/`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(channelInformation)})
    if (response.ok) {
      const data = await response.json();
      dispatch(updateChannelToServerAC(channelInformation, serverId, channelId))
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

export const addMemberToServer = (serverId) => async(dispatch) => {
  console.log('i hit it')
  const response = await fetch(`/api/servers/${serverId}/members/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"}})
    if (response.ok) {
      const data = await response.json();
      // const response2 = await fetch(`/api/servers/`);
      // const data2 = await response2.json()
      // dispatch(getAllServersAC(data2.servers))
      dispatch(addMemberToServerAC(data))
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

export const getAllMessagesOfServer = (specificServerId, specificChannelId) => async(dispatch) => {
  if (!specificChannelId) return null;
  const response = await fetch(`/api/servers/${+specificServerId}/${+specificChannelId}/`)
  if (response.ok) {
    const data = await response.json();
    dispatch(getMessagesOfServerAC(data, +specificServerId))
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

export const postMessageToServer = (messageInformation, serverId) => async(dispatch) => {
  const { channel_id } = messageInformation;
  const response = await fetch(`/api/servers/${+serverId}/${+channel_id}/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(messageInformation)})
    if (response.ok) {
      const data = await response.json();
      dispatch(postMessageToServerAC(data, serverId))
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

export const updateAMessage = (messageInformation) => async (dispatch) => {
  const { channel_id, message_id, server_id} = messageInformation;
  const response = await fetch(`/api/servers/${server_id}/${channel_id}/${message_id}/`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(messageInformation)})
    if (response.ok) {
      const data = await response.json();
      dispatch(updateAMessageAC(data, server_id))
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

export const deleteAMessage = (messageInformation) => async (dispatch) => {
  const { channel_id, message_id, server_id } = messageInformation;
  const response = await fetch(`/api/servers/${+server_id}/${+channel_id}/${+message_id}/`, {
    method: "DELETE"})
    if (response.ok) {
      const data = await response.json();
      dispatch(deleteAMessageAC(messageInformation))
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

export default function reducer(state = {} , action) {
    let newState;
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
        case GET_CHANNELS_TO_SERVER:
          newState = {...state}
          action.payload.forEach((singleChannel) => newState[action.serverId].channels[singleChannel.id] = singleChannel) 
          newState[action.serverId].channels = {...newState[action.serverId].channels}
          return newState;
        case ADD_CHANNEL_TO_SERVER:
          newState = {...state}
          newState[action.payload.server_id].channels[action.payload.id] = action.payload
          newState[action.payload.server_id].channels = {...newState[action.payload.server_id].channels}
          return newState;
        case DELETE_CHANNEL_TO_SERVER:
          newState = {...state};
          delete newState[action.serverId].channels[action.channelId]
          newState[action.serverId].channels = {...newState[action.serverId].channels}
          return newState;
        case UPDATE_CHANNEL_TO_SERVER:
          newState = {...state}
          newState[action.serverId].channels[action.channelId] = action.payload
          newState[action.serverId].channels = {...newState[action.serverId].channels}
          return newState;
        case GET_ALL_MESSAGES:
          newState = {...state}
          action.payload.messages.forEach((singleMessage) => newState[action.serverId].channels[singleMessage.channel_id].messages[singleMessage.id] = singleMessage)
          return newState;
        case POST_A_MESSAGE:
          newState = {...state}
          newState[action.serverId].channels[action.payload.channel_id].messages[action.payload.id] = action.payload
          return newState;
        case UPDATE_A_MESSAGE:
          newState = {...state}
          newState[action.serverId].channels[action.payload.channel_id].messages[action.payload.id] = action.payload;
          return newState;
        case DELETE_A_MESSAGE:
          newState = {...state};
          delete newState[action.payload.server_id].channels[action.payload.channel_id].messages[action.payload.message_id]
          return newState;
        // case ADD_MEMBER_TO_SERVER:
        //   newState = {...state}
        //   console.log('acccccccccc', action.payload.server.id, action.payload)
        //   newState[action.server.id].members = action.server.members
        //   newState[action.server.id].members_list = action.server.members_list
        //   return newState;
        case 'logout':
          newState = null
          return newState;
          default:
            return state
    }
} 
