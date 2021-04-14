import React from 'react'
import { YMaps, Map } from 'react-yandex-maps';

function YandexMap() {
    return (
        <YMaps>
            <Map className="yndx_map" defaultState={{center: [55.751574, 37.573856], zoom: 9}}/>
        </YMaps>
    );
}

export default YandexMap;
