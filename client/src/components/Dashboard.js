import React from 'react'
import { useConversation } from '../contexts/ConversationProvider'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

export default function Dashboard ({ id }) {
    const { selectedConversation } = useConversation()

    return (
        <div className="d-flex" style={{ height: '100vh'}}>
            <Sidebar id={id} />
            { selectedConversation && <OpenConversation />}
        </div>
    )
}