import { useEffect, useState } from 'react';
import { useLocation, Route, Router } from 'react-router-dom';
import List from './components/List';
import FormComponent from './components/FormComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShareComponent from './components/ShareComponent';

function App() {
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

    // const location = useLocation();

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const encodedData = params.get('data');

    //     if (encodedData) {
    //         try {
    //             const decodedData = JSON.parse(decodeURIComponent(encodedData));
    //             setData(decodedData);
    //         } catch (error) {
    //             console.error('Error decoding data', error);
    //         }
    //     }
    // }, [location.search]);

    useEffect(() => {
        let url = window.location.href;
        let i = url.indexOf('="');
        console.log(url.slice(i));
    }, []);

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
        // <Router>
        //     {/* <Header/> */}
        //     <Routes>
        //         <Route
        //             path='/'
        //             element={
        <div className='wrapper'>
            <FormComponent list={data} onAdd={handleAddElement}></FormComponent>
            <List
                list={data}
                onChange={handleChangeStatus}
                onDelete={handleDeleteElement}></List>
            <ShareComponent></ShareComponent>
        </div>
        //             }
        //         />
        //     </Routes>
        // </Router>
    );
}

export default App;
