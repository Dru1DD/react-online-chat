import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContact } from '../contexts/ContactsProvider'
import { useConversation } from '../contexts/ConversationProvider'

export default function NewConversationModal ({ closeModal }) {
    const [ selectedContactIds, setSelectedContactIds] = useState([])
    const { createConversation } = useConversation()
    const { contacts } = useContact()

    function handleSubmit(e) {
        e.preventDefault()

        createConversation(selectedContactIds)

        closeModal()
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter (prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }
    return (
        <div>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map (contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check
                            type="checkbox"
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckboxChange(contact.id)}
                        />
                        </Form.Group>
                    ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>

        </div>
    )
}