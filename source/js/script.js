let mapBlock = document.querySelector('.content');
const adresPoint = document.querySelector('.top__header');
const balloonPopUp = document.querySelector('.balloon');
ymaps.ready(init);
function init() {
    // Создание карты.
    let myPlacemark;
    const myMap = new ymaps.Map(mapBlock, {
        // Координаты центра карты.
        // Порядок по умолчнию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [43.119796, 131.893628],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 16
    },{
        searchControlProvider: 'yandex#search'
    });

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        const coords = e.get('coords');


        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
        clikMap();


    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }
    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonHeader: firstGeoObject.getAddressLine(),
                    balloonContent: 'Заголовок балуна'

                });
            console.log(firstGeoObject.getAddressLine());


            adresPoint.textContent = firstGeoObject.getAddressLine();
        });

    }
}

function clikMap() {
    mapBlock.addEventListener('click', () => {
        console.log('test');
        console.log(balloonPopUp.classList);
        balloonPopUp.classList.remove('hide');
    })
}

