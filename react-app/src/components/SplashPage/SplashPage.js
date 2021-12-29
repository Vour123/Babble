import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function SplashPage() {
    const history = useHistory();
    const server = useSelector(state => state.server)

    // let valueOfServer
    // if(server) {
    //     valueOfServer = Object.values(server);
    // }

    // useEffect(() => {
    //     if(valueOfServer[0]) {
    //         history.push(`/servers/${valueOfServer[0].id}`)
    //       }
    // },[valueOfServer])

    return (
        <div>
            splash page
        </div>
    )
}
