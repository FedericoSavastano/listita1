import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormComponent({ list, onAdd }) {
    const [listElements, setListElements] = useState('');
    const [category, setCategory] = useState(list[0].category);

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

                            <Form.Select
                                aria-label='Default select example'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                                <option value=''>Categoria</option>
                                {list.map((e) => (
                                    <option key={e.id} value={e.category}>
                                        {e.category}
                                    </option>
                                ))}
                            </Form.Select>

                            <Button
                                variant='secondary'
                                onClick={handleAddItems}
                                style={{ margin: '1rem 0rem' }}>
                                Agregar
                            </Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default FormComponent;
