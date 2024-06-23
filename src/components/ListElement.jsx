import Accordion from 'react-bootstrap/Accordion';

function ListElement({ element, onChange, onDelete }) {
    let itemsLeft = element.data.filter((e) => e.bought === false).length;
    return (
        <>
            <Accordion.Item eventKey={element.id} key={element.id}>
                <Accordion.Header>
                    {element.category.toUpperCase()} - faltan {itemsLeft}
                </Accordion.Header>
                <Accordion.Body className='accordion-body'>
                    <ul className='list-items'>
                        {element.data.map((listElement) => (
                            <li key={listElement.name} className='list-item'>
                                <button
                                    onClick={onChange}
                                    id={element.id}
                                    name={listElement.name}
                                    style={{
                                        textDecoration: listElement.bought
                                            ? 'line-through'
                                            : 'none',
                                    }}
                                    className='button-list-element'>
                                    {listElement.name}{' '}
                                </button>
                                <button
                                    onClick={onDelete}
                                    id={element.id}
                                    name={listElement.name}
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
