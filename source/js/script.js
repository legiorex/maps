let mapBlock = document.querySelector('.content');
const adressPoint = document.querySelector('.top__header');
const balloonPopUp = document.querySelector('.balloon');
const buttonSave = document.querySelector('.bottom__button-add');
const userName = document.querySelector('.name-user');
const place = document.querySelector('.place');
const review = document.querySelector('.review');
const [date, time] = new Date().toLocaleString().split(', ');
let coords;


let dataReview = {
    type: 'FeatureCollection',
    features: []
};


let storage = localStorage;







ymaps.ready(init);
function init() {
    // Создание карты.

    let myPlacemark;
    let myMap = new ymaps.Map(mapBlock, {
        // Координаты центра карты.
        // Порядок по умолчнию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [43.119796, 131.893628],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    });

    objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
    });
    // Подписываемся на событие клика по объекту.
    objectManager.objects.events.add(['click'], function (e) {
        // objectId – идентификатор объекта, на котором произошло событие.
        let objectId = e.get('objectId'),
            object = objectManager.objects.getById(objectId);
        // Выведем информацию об объекте.
        console.log('Тип объекта: ' + object.geometry.type);
        console.log('Координаты объекта: ' + object.geometry.coordinates);
    });

    // console.log(objectManager.events);
    // objectManager.addEventListener('click', () => {
    //     console.log('test');
    // })

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        coords = e.get('coords');

        getAddress(coords);
        clickMap();

    });

// Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            adressPoint.textContent = firstGeoObject.getAddressLine();
        });

    }


    function isClickForm(e) {

        if(balloonPopUp.classList.contains('hide')){
            return false;
        }

        let left = parseInt((balloonPopUp.style.left), 10);
        let top = parseInt((balloonPopUp.style.top), 10);
        let finishX = left + balloonPopUp.offsetWidth;
        let finishY = top + balloonPopUp.offsetHeight;


        if(left <= e.pageX && e.pageX <= finishX && e.pageY >= top && e.pageY <= finishY)
        {
            return true;
        }
        return false;
    }


    function clickMap() {
        mapBlock.addEventListener('click', (e) => {

            if(!isClickForm(e)){
                balloonPopUp.classList.remove('hide');
                balloonPopUp.style.left = e.pageX + 'px';
                balloonPopUp.style.top = e.pageY + 'px';

                balloonPopUp.addEventListener('click', () => {
                    console.log('second click');
                });
            }
        })

    }
    

    
    let curentId = 0;
    buttonSave.addEventListener('click', () => {

    let obj = {
        type: 'Feature',
        id: curentId++,
        geometry: {
            type : 'Point',
            coordinates: coords
        },
        properties : {
            balloonContentHeader: place.value,
                balloonContentBody: review.value,
                balloonContentFooter: adressPoint.textContent
        }

    };
    dataReview.features.push(obj);

        // Сохраняю данные в стородж
        storage.data = JSON.stringify(dataReview);

        objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
        myMap.geoObjects.add(objectManager);
        objectManager.add(storage.data);

        console.log(objectManager.objects.click);

        userName.value = '';
        place.value = '';
        review.value = '';

    })


}

// function dataArray(coords) {
//     // Создаем объект с данными
//     let item = {
//         coords: coords,
//         date: date,
//         time: time,
//         name: userName.value,
//         place: place.value,
//         review: review.value,
//         adress: adressPoint.textContent
//     };
//
//     // Записываем данные в массив
//     dataReview.push(item);
//     console.log(dataReview);
//     return dataReview;
//
// }






