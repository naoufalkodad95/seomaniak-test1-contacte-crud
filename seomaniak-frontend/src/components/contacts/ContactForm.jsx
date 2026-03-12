import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ContactForm = ({ onSubmit, initialData, onCancel }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialData || {
            nom: '',
            prenom: '',
            email: '',
            telephone: ''
        }
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({
                nom: '',
                prenom: '',
                email: '',
                telephone: ''
            });
        }
    }, [initialData, reset]);

    const submitForm = (data) => {
        onSubmit(data);
        if (!initialData) {
            reset();
        }
    };

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <i className="bi bi-person me-1"></i>
                            Nom <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Entrez le nom"
                            {...register('nom', { required: 'Le nom est requis' })}
                            isInvalid={!!errors.nom}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nom?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <i className="bi bi-person me-1"></i>
                            Prénom <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Entrez le prénom"
                            {...register('prenom', { required: 'Le prénom est requis' })}
                            isInvalid={!!errors.prenom}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.prenom?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>
                    <i className="bi bi-envelope me-1"></i>
                    Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="exemple@email.com"
                    {...register('email', { 
                        required: "L'email est requis",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email invalide'
                        }
                    })}
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>
                    <i className="bi bi-telephone me-1"></i>
                    Téléphone
                </Form.Label>
                <Form.Control
                    type="tel"
                    placeholder="06 12 34 56 78"
                    {...register('telephone')}
                />
                <Form.Text className="text-muted">
                    Optionnel
                </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
                <Button 
                    variant="primary" 
                    type="submit"
                    className="flex-grow-1"
                >
                    <i className={`bi bi-${initialData ? 'pencil' : 'plus-circle'} me-2`}></i>
                    {initialData ? 'Mettre à jour' : 'Ajouter'}
                </Button>
                
                {onCancel && (
                    <Button 
                        variant="danger" 
                        onClick={onCancel}
                    >
                        <i className="bi bi-x-circle me-2"></i>
                        Annuler
                    </Button>
                )}
            </div>
        </Form>
    );
};

export default ContactForm;