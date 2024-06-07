import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

function ListElement({ element, onChange, onDelete, index }) {
    let itemsLeft = element.data.filter((e) => e.comprado === false).length;
    return (
        <>
            <Accordion.Item eventKey={element.id} key={element.id}>
                <Accordion.Header>
                    {element.category.toUpperCase()} - faltan {itemsLeft}
                </Accordion.Header>
                <Accordion.Body className='accordion-body'>
                    <ul className='list-items'>
                        {element.data.map((listElement) => (
                            <li key={listElement.nombre} className='list-item'>
                                <button
                                    onClick={onChange}
                                    id={element.id}
                                    name={listElement.nombre}
                                    style={{
                                        textDecoration: listElement.comprado
                                            ? 'line-through'
                                            : 'none',
                                    }}
                                    className='button-list-element'>
                                    {listElement.nombre}{' '}
                                </button>
                                <button
                                    onClick={onDelete}
                                    id={element.id}
                                    name={listElement.nombre}
                                    className='button-delete'>
                                    🗑
                                </button>
                            </li>
                        ))}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
}

export default ListElement;
