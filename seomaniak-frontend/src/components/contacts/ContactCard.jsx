import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
        <Card className="contact-card h-100 fade-in">
            <Card.Header>
                <h5 className="mb-0">
                    <i className="bi bi-person-circle me-2"></i>
                    {contact.prenom} {contact.nom}
                </h5>
            </Card.Header>
            <Card.Body>
                <div className="contact-info">
                    <p className="card-text">
                        <i className="bi bi-envelope-fill"></i>
                        {contact.email}
                    </p>
                    {contact.telephone && (
                        <p className="card-text">
                            <i className="bi bi-telephone-fill"></i>
                            {contact.telephone}
                        </p>
                    )}
                </div>
                
                <Row className="mt-3">
                    <Col>
                        <Button 
                            variant="warning" 
                            onClick={() => onEdit(contact)}
                            className="w-100"
                            size="sm"
                        >
                            <i className="bi bi-pencil me-1"></i>
                            Modifier
                        </Button>
                    </Col>
                    <Col>
                        <Button 
                            variant="danger" 
                            onClick={() => onDelete(contact.id)}
                            className="w-100"
                            size="sm"
                        >
                            <i className="bi bi-trash me-1"></i>
                            Supprimer
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ContactCard;