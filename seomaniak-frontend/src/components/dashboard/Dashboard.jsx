import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import ContactForm from '../contacts/ContactForm';
import ContactList from '../contacts/ContactList';
import contactService from '../../services/contactService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../custom.css';

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingContact, setEditingContact] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Charger les contacts au démarrage
    useEffect(() => {
        fetchContacts();
    }, []);

    // Fonction pour récupérer tous les contacts
    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await contactService.getAll();
            setContacts(response.data || []);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des contacts');
            console.error('❌ Erreur fetchContacts:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour ajouter un contact
    const handleAddContact = async (contactData) => {
        try {
            const response = await contactService.create(contactData);
            setContacts([...contacts, response.data]);
            setShowForm(false);
            setSuccess('✅ Contact ajouté avec succès !');
            setError(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError("❌ Erreur lors de l'ajout du contact");
            console.error('❌ Erreur handleAddContact:', err);
        }
    };

    // Fonction pour modifier un contact
    const handleUpdateContact = async (contactData) => {
        try {
            const response = await contactService.update(editingContact.id, contactData);
            const updatedContacts = contacts.map(c => 
                c.id === editingContact.id ? response.data : c
            );
            setContacts(updatedContacts);
            setEditingContact(null);
            setShowForm(false);
            setSuccess('✅ Contact modifié avec succès !');
            setError(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError('❌ Erreur lors de la mise à jour');
            console.error('❌ Erreur handleUpdateContact:', err);
        }
    };

    // Fonction pour supprimer un contact
    const handleDeleteContact = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
            try {
                await contactService.delete(id);
                setContacts(contacts.filter(c => c.id !== id));
                setSuccess('✅ Contact supprimé avec succès !');
                setError(null);
                setTimeout(() => setSuccess(null), 3000);
            } catch (err) {
                setError('❌ Erreur lors de la suppression');
                console.error('❌ Erreur handleDeleteContact:', err);
            }
        }
    };

    // Fonction pour éditer un contact
    const handleEditClick = (contact) => {
        setEditingContact(contact);
        setShowForm(true);
    };

    // Fonction pour annuler le formulaire
    const handleCancelForm = () => {
        setEditingContact(null);
        setShowForm(false);
    };

    return (
        <div className="app-container">
            <Container>
                {/* Header avec titre */}
                <div className="app-header text-center fade-in">
                    <h1>
                        <i className="bi bi-person-lines-fill me-2"></i>
                        Gestion des Contacts
                    </h1>
                    <p className="mb-0">Gérez vos contacts professionnels en toute simplicité</p>
                </div>

                {/* Notifications d'erreur */}
                {error && (
                    <Alert variant="danger" className="fade-in" onClose={() => setError(null)} dismissible>
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </Alert>
                )}
                
                {/* Notifications de succès */}
                {success && (
                    <Alert variant="success" className="fade-in" onClose={() => setSuccess(null)} dismissible>
                        <i className="bi bi-check-circle-fill me-2"></i>
                        {success}
                    </Alert>
                )}

                {/* Contenu principal */}
                <Row>
                    {/* Colonne de gauche avec le formulaire */}
                    <Col lg={4} className="mb-4">
                        <Card className="contact-form fade-in">
                            <Card.Header>
                                <h4 className="mb-0">
                                    <i className={`bi bi-${editingContact ? 'pencil-fill' : 'person-plus-fill'} me-2`}></i>
                                    {editingContact ? 'Modifier le contact' : 'Nouveau contact'}
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                {/* Bouton pour afficher/masquer le formulaire */}
                                <Button 
                                    variant={showForm ? "danger" : "primary"}
                                    onClick={() => {
                                        setEditingContact(null);
                                        setShowForm(!showForm);
                                    }}
                                    className="w-100 mb-3"
                                >
                                    <i className={`bi bi-${showForm ? 'x-circle' : 'plus-circle'} me-2`}></i>
                                    {showForm ? 'Fermer le formulaire' : 'Ajouter un contact'}
                                </Button>

                                {/* Formulaire conditionnel */}
                                {showForm && (
                                    <ContactForm
                                        onSubmit={editingContact ? handleUpdateContact : handleAddContact}
                                        initialData={editingContact}
                                        onCancel={handleCancelForm}
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Colonne de droite avec la liste des contacts */}
                    <Col lg={8}>
                        <Card className="fade-in">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">
                                    <i className="bi bi-people-fill me-2"></i>
                                    Liste des contacts
                                </h4>
                                <Badge bg="success" className="badge-success">
                                    {contacts.length} contact{contacts.length > 1 ? 's' : ''}
                                </Badge>
                            </Card.Header>
                            <Card.Body>
                                {/* Affichage conditionnel : loader ou liste */}
                                {loading ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" variant="primary" />
                                        <p className="mt-3 text-muted">Chargement des contacts...</p>
                                    </div>
                                ) : (
                                    <ContactList
                                        contacts={contacts}
                                        onEdit={handleEditClick}
                                        onDelete={handleDeleteContact}
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;