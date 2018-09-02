let mapBlock = document.querySelector('.content');
const adresPoint = document.querySelector('.top__header');
const balloonPopUp = document.querySelector('.balloon');
// center: [43.119796, 131.893628],
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

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        const coords = e.get('coords');
        myMap.geoObjects
            .add(new ymaps.Placemark(coords, {
                balloonContent: 'Это новая точка'
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }))

        getAddress(coords);
        clikMap();
        // balloonPopUp.removeEventListener('click', clikMap);

    });

// Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        // myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);

            // myPlacemark.properties
            //     .set({
            //         // Формируем строку с данными об объекте.
            //         iconCaption: [
            //             // Название населенного пункта или вышестоящее административно-территориальное образование.
            //             firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            //             // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            //             firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
            //         ].filter(Boolean).join(', '),
            //         // В качестве контента балуна задаем строку с адресом объекта.
            //         balloonHeader: firstGeoObject.getAddressLine(),
            //
            //
            //     });
            console.log(coords);
            adresPoint.textContent = firstGeoObject.getAddressLine();
        });

    }
}

function isClickForm(e) {

    if(balloonPopUp.classList.contains('hide')){
            return true;
        }else {
            let finishX = e.pageX + balloonPopUp.offsetWidth;
            let finishY = e.pageY + balloonPopUp.offsetHeight;
            let left = parseInt((balloonPopUp.style.left), 10);
            let top = parseInt((balloonPopUp.style.top), 10);
    // && ((e.pageY < top) || (e.pageY > finishY))
            if( ((e.pageX < left) || (e.pageX > finishX)) && ((e.pageY < top) || (e.pageY > finishY)) )
    //         if( e.pageX < left && e.pageX >= finishX || e.pageY < top && e.pageY > finishY )
            {
                return true;
            }
            return false;

    }

}

function clikMap() {
    mapBlock.addEventListener('click', (e) => {
        // console.log(e.target);

        if(isClickForm(e)){
            balloonPopUp.classList.remove('hide');
            balloonPopUp.style.left = e.pageX + 'px';
            balloonPopUp.style.top = e.pageY + 'px';
            console.log(balloonPopUp.style.left);
            console.log(balloonPopUp.offsetWidth + 'ширина');
            console.log(e.pageX + 'координаты х')

            balloonPopUp.addEventListener('click', (e) => {
                console.log('second click');


            });

        }



    })

}


