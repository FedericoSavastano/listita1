import React from 'react';
import Button from 'react-bootstrap/Button';

function ResetComponent({ resetData }) {
    return (
        <>
            <Button onClick={() => resetData()}>Reiniciar ↻</Button>
        </>
    );
}

export default ResetComponent;
