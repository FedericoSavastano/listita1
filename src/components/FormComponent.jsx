import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FormComponent({ list, onAdd }) {
    const [listElements, setListElements] = useState('');
    const [category, setCategory] = useState(list[0].category);
    const [show, setShow] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddItems = (e) => {
        e.preventDefault();

        if (!listElements || !category) return;

        const separatedArray = Array.from(listElements.split(','));
        let newListOfElements = [];
        let listnew = list;

        separatedArray.forEach((value) =>
            newListOfElements.push({ nombre: value.trim(), comprado: false })
        );

        listnew.forEach((e) => {
            if (e.category === category) {
                e.data.push(...newListOfElements);
            }
        });

        onAdd(listnew);
        setListElements('');
    };

    const handleAddNewCategory = (e) => {
        e.preventDefault();

        if (!newCategory) return;

        let listnew = list;

        listnew.push({ id: Math.random(), category: newCategory, data: [] });

        onAdd(listnew);
        setListElements('');
        handleClose();
    };

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>Agregar item</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={handleAddItems}>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlTextarea1'>
                                <Form.Label>
                                    Anote elementos separados por coma
                                </Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={2}
                                    value={listElements}
                                    onChange={(e) =>
                                        setListElements(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Categoria</Form.Label>

                                <div className='category-wrapper'>
                                    <Form.Select
                                        aria-label='Default select example'
                                        className='category-selector'
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }>
                                        {list.map((e) => (
                                            <option
                                                key={e.id}
                                                value={e.category}>
                                                {e.category}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    <Button
                                        className='category-new-btn'
                                        variant='warning'
                                        onClick={handleShow}>
                                        ➕
                                    </Button>
                                </div>
                            </Form.Group>
                            <Button
                                variant='secondary'
                                onClick={handleAddItems}
                                style={{ margin: '1rem 0rem' }}>
                                Agregar
                            </Button>
                        </Form>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleAddNewCategory}>
                                    <Form.Group
                                        className='mb-3'
                                        controlId='exampleForm.ControlTextarea1'>
                                        <Form.Label>
                                            Agregue una nueva categoria
                                        </Form.Label>

                                        <Form.Control
                                            type='text'
                                            value={newCategory}
                                            onChange={(e) =>
                                                setNewCategory(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant='secondary'
                                    onClick={handleClose}>
                                    Close
                                </Button>
                                <Button
                                    variant='primary'
                                    onClick={handleAddNewCategory}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default FormComponent;
