import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import List from './List';
import FormComponent from './FormComponent';
import ShareComponent from './ShareComponent';

function Home() {
    const dataG = [
        {
            id: 1,
            category: 'limpieza',
            data: [
                { nombre: 'shampoo', comprado: false },
                { nombre: 'lavandina', comprado: false },
            ],
        },
        {
            id: 2,
            category: 'comida',
            data: [
                { nombre: 'pollo', comprado: false },

                { nombre: 'carne', comprado: false },

                { nombre: 'verdura', comprado: false },
            ],
        },
        {
            id: 3,
            category: 'farmacia',
            data: [
                { nombre: 'ibupirac', comprado: false },

                { nombre: 'sertal', comprado: false },
            ],
        },

        {
            id: 4,
            category: 'kiosko',
            data: [
                { nombre: 'chocolate', comprado: false },

                { nombre: 'galletitas', comprado: false },
            ],
        },
    ];

    /**
     * TO DO
     * GUARDAR LOS DATOS EN LOCALSTORAGE
     * GENERAR EL AGREGADOR DE CATEGORIA
     */

    const [data, setData] = useState(
        JSON.parse(localStorage.getItem('listElements')) || dataG
    );

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const encodedData = params.get('data');

        if (encodedData) {
            try {
                const decodedData = JSON.parse(JSON.parse(encodedData));
                console.log('encoded data', encodedData);
                setData(decodedData);
            } catch (error) {
                console.error('Error decoding data', error);
            }
        }
    }, [location.search]);

    useEffect(() => {
        localStorage.setItem('listElements', JSON.stringify(data));
    }, [data]);

    function refreshData(newData) {
        setData(newData);
    }

    const handleChangeStatus = (event) => {
        let listLocal = data;

        let obj = listLocal.filter((e) => e.id === Number(event.target.id))[0];

        obj.data.forEach((e) =>
            e.nombre === event.target.name ? (e.comprado = !e.comprado) : e
        );

        listLocal.forEach((e) =>
            e.id === Number(event.target.id) ? (e.data = obj.data) : e
        );

        refreshData([...listLocal]);
    };

    const handleDeleteElement = (event) => {
        let listLocal = data;

        let obj = listLocal.filter((e) => e.id === Number(event.target.id))[0];

        let listFiltered = obj.data.filter(
            (e) => e.nombre !== event.target.name
        );

        listLocal.forEach((e) =>
            e.id === Number(event.target.id) ? (e.data = listFiltered) : e
        );

        refreshData([...listLocal]);
    };

    const handleAddElement = (newList) => {
        refreshData([...newList]);
    };

    return (
        <div className='wrapper'>
            <FormComponent list={data} onAdd={handleAddElement}></FormComponent>
            <List
                list={data}
                onChange={handleChangeStatus}
                onDelete={handleDeleteElement}></List>
            <ShareComponent></ShareComponent>
        </div>
    );
}

export default Home;