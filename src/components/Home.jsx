import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from './List';
import FormComponent from './FormComponent';
import Footer from './Footer';

function Home() {
    const template = [
        {
            id: 1,
            category: 'limpieza',
            data: [
                // { name: 'shampoo', bought: false },
                // { name: 'lavandina', bought: false },
            ],
        },
        {
            id: 2,
            category: 'comida',
            data: [
                // { name: 'pollo', bought: false },
                // { name: 'carne', bought: false },
                // { name: 'verdura', bought: false },
            ],
        },
        {
            id: 3,
            category: 'farmacia',
            data: [
                // { name: 'ibupirac', bought: false },
                // { name: 'sertal', bought: false },
            ],
        },

        {
            id: 4,
            category: 'kiosko',
            data: [
                // { name: 'chocolate', bought: false },
                // { name: 'galletitas', bought: false },
            ],
        },
    ];

    // state for data. From localStorage, or template
    const [data, setData] = useState(
        JSON.parse(localStorage.getItem('listElements')) || template
    );

    const location = useLocation();

    const navigate = useNavigate();

    // checks if there's data in url. if true, sets data.
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const encodedData = params.get('data');

        if (encodedData) {
            try {
                const decodedData = JSON.parse(decodeURIComponent(encodedData));
                setData(decodedData);
                // this navigate is used for preventing from refreshing an old url and loosing data
                navigate('/');
            } catch (error) {
                console.error('Error decoding data', error);
            }
        }
    }, [location.search]);

    // adds changes to data to localStorage
    useEffect(() => {
        localStorage.setItem('listElements', JSON.stringify(data));
    }, [data]);

    function refreshData(newData) {
        setData(newData);
    }

    function resetData() {
        setData(template);
    }

    // changes status of single element in list
    const handleChangeStatus = (event) => {
        let listLocal = data;

        let obj = listLocal.filter((e) => e.id === Number(event.target.id))[0];

        obj.data.forEach((e) =>
            e.name === event.target.name ? (e.bought = !e.bought) : e
        );

        listLocal.forEach((e) =>
            e.id === Number(event.target.id) ? (e.data = obj.data) : e
        );

        refreshData([...listLocal]);
    };

    const handleAddElement = (newList) => {
        refreshData([...newList]);
    };

    const handleDeleteElement = (event) => {
        let listLocal = data;

        let obj = listLocal.filter((e) => e.id === Number(event.target.id))[0];

        let listFiltered = obj.data.filter((e) => e.name !== event.target.name);

        listLocal.forEach((e) =>
            e.id === Number(event.target.id) ? (e.data = listFiltered) : e
        );

        refreshData([...listLocal]);
    };

    return (
        <div className='wrapper'>
            <FormComponent list={data} onAdd={handleAddElement}></FormComponent>
            <List
                list={data}
                onChange={handleChangeStatus}
                onDelete={handleDeleteElement}></List>
            <Footer resetData={resetData}></Footer>
        </div>
    );
}

export default Home;
