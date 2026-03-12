import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import ContactCard from './ContactCard';

const ContactList = ({ contacts, onEdit, onDelete }) => {
    if (contacts.length === 0) {
        return (
            <Alert variant="info" className="text-center py-5">
                <i className="bi bi-emoji-frown fs-1 d-block mb-3"></i>
                <h5>Aucun contact trouvé</h5>
                <p className="mb-0">Cliquez sur "Ajouter un contact" pour commencer</p>
            </Alert>
        );
    }

    return (
        <Row xs={1} md={2} className="g-4">
            {contacts.map(contact => (
                <Col key={contact.id}>
                    <ContactCard
                        contact={contact}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default ContactList;