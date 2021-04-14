import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from '../store/store';
import {useDispatch} from 'react-redux';
import Navbar from './Navbar';
import Form from './Form';
import YandexMap from './YandexMap';

import {geodata_fetch, regions_fetch, waterbases_fetch} from '../store/storeSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            dispatch(geodata_fetch({latitude, longitude}))
        });

        dispatch(regions_fetch())
        dispatch(waterbases_fetch())
    }, []);

    return (
        <div className="container">
            <Navbar/>
            <div className="row">
                <div className="col-sm mb-5">
                    <Form/>
                </div>
                <div className="col-sm">
                    <YandexMap/>
                </div>
            </div>
        </div>
    );
};

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('app')
    );
}
