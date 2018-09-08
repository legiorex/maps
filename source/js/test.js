ymaps.ready(init);
var myMap,
    clusterer,
    myPlacemark,
    gc = [],
    mapBlock = document.querySelector('.content');
wc = document.querySelector('.balloon'),
    buttonClose = document.querySelector('.button__close'),
    buttonAdd = document.querySelector('.bottom__button-add'),
    adress = document.querySelector('.top__header'),
    inputName = document.querySelector('.name-user'),
    inputPlace = document.querySelector('.place'),
    comments = document.querySelector('.top__comments'),
    inputText = document.querySelector('.review');

function init(){
    myMap = new ymaps.Map(mapBlock, {
        center: [56.84, 35.90],
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    }),

        //Создание кластера.
        clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
            clusterOpenBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 200,
            clusterBalloonContentLayoutHeight: 130,
            clusterBalloonPagerSize: 5
        }),

        points = [];

    clusterer.add(points);
    myMap.geoObjects.add(clusterer);

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        gc = coords;
        comments.innerHTML = 'Отзывов пока нет...';

        if (myMap.balloon.isOpen()) {
            myMap.balloon.close();
        };

        // Выводим окно с отзывами и формой.
        wcOpen(e);

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
        }

        getAddress(coords);
        return gc;
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: false
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

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
                    balloonContent: firstGeoObject.getAddressLine()
                });
            // Записываем адресс обьекта в хедер окна.
            adress.innerText = firstGeoObject.getAddressLine();
        });
    };

    // Вешаем обработчик на кнопку "добавить".
    buttonAdd.addEventListener('click', function () {
        if (inputName.value && inputPlace.value && inputText.value) {
            //Задаём адрес отзыва.
            var adressLink = adress.innerText;

            //Задаём дату отзыва.
            const [date, time] = new Date().toLocaleString().split(', ');
            var now = `${date} ${time}`;

            //Создаём метку.
            var newPlacemark = new ymaps.Placemark(gc, {
                balloonContentHeader: inputPlace.value,
                balloonContentBody: '<a onclick="wcOpenFull()" class="balloon__adress_link">' + adressLink + '</a><br><br>' + inputText.value + '<br><br>',
                balloonContentFooter:now
            },{
                preset: 'islands#violetDotIconWithCaption',
                draggable: false,
                openBalloonOnClick: false
            });

            //Добавляем метку на карту, в кластер и массив points.
            myMap.geoObjects.add(newPlacemark);
            clusterer.add(newPlacemark);
            points.push(newPlacemark);

            //Задаем содержимое блока с отзывами.
            if (comments.innerHTML === 'Отзывов пока нет...') comments.innerHTML = '';
            newPlacemark.commentContent = '<div><span><b>' + inputName.value + '</b></span> <span class="ligth">' + inputPlace.value + '</span> <span class="ligth">' + now + ':</span> <br> <span>' + inputText.value + '</span></div><br>';
            comments.innerHTML += newPlacemark.commentContent;
            newPlacemark.place = adress.innerText;

            //Очищаем импуты.
            clearInputValue();

            //Слушаем клик на метке.
            newPlacemark.events.add('click', function() {
                wcOpen();
                comments.innerHTML = newPlacemark.commentContent;
                gc = newPlacemark.geometry.getCoordinates();
                adress.innerText = newPlacemark.place;
                return gc;
            });
        } else {
            alert('Пожалуйста, заполните все поля, чтобы добавить отзыв.');
        };
    });
};

//Вешаем обработчик клика для скрытия окна с отзывами и формой.
buttonClose.addEventListener('click', () => {
    wc.style.display = 'none';
    clearInputValue();
});

//Создаём функцию очистки импутов.
var clearInputValue = function() {
    inputName.value = '';
    inputPlace.value = '';
    inputText.value = '';
};

//Создаём функцию открытия окна с отзывами и формой.
var wcOpen = function(e) {
    wc.style.top = e.pageY + 'px';
    wc.style.left = e.pageX + 'px';
    wc.classList.remove('hide');

};

//Создаём функцию открытия заполненного окна с отзывами и формой (вызывается при клике на адрес в балуне).
var wcOpenFull = function() {
    adress.innerText = '';
    comments.innerHTML = '';
    var a = document.querySelector('.balloon__adress_link');

    for (var i = 0; i < points.length; i++) {
        if (a.innerText === points[i].place) {
            adress.innerText = points[i].place;
            comments.innerHTML += points[i].commentContent;
        };
    };

    wc.style.top = e.pageY + 'px';
    wc.style.left = e.pageX + 'px';
    wc.classList.remove('hide');

    if (myMap.balloon.isOpen()) {
        myMap.balloon.close();
    };
};




