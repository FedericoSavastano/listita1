import Accordion from 'react-bootstrap/Accordion';
import ListElement from './ListElement';

function List({ list, onChange, onDelete }) {
    return (
        <Accordion
            defaultActiveKey={Array.from(list.map((e) => e.id))}
            alwaysOpen>
            {list.map((element, index) => (
                <>
                    <ListElement
                        element={element}
                        onChange={onChange}
                        onDelete={onDelete}
                        index={index.toString()}></ListElement>
                </>
            ))}
        </Accordion>
    );
}

export default List;
