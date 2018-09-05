let mapBlock = document.querySelector('.content');
const adressPoint = document.querySelector('.top__header');
const balloonPopUp = document.querySelector('.balloon');
const buttonSave = document.querySelector('.bottom__button-add');
const userName = document.querySelector('.name-user');
const place = document.querySelector('.place');
const review = document.querySelector('.review');
const [date, time] = new Date().toLocaleString().split(', ');


let dataReview = [];
let storage = localStorage;








let dataReview

let listPoint = [[43.119784, 131.893635], [43.119726, 131.893611], [43.119708, 131.893674]];

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

<<<<<<< HEAD



    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        const coords = e.get('coords');
        myMap.geoObjects
            .add(new ymaps.Placemark(coords, {
                balloonContentHeader: 'Это новая точка'
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }))

=======
    ClusterBalloonContentItemLayout = ymaps.templateLayoutFactory.createClass([
        '<div class=entry>',
        '<div class=bold>$[item.place]</div>',
        '<div>$[item.review]</div>',
        '<div class=author>$[item.date]</div>',
        '</div>'
    ].join(''));


    // for(let point of listPoint){
    //     myMap.geoObjects
    //         .add(new ymaps.Placemark(point, {
    //             balloonContent: 'Это новая точка'
    //         }, {
    //             preset: 'islands#icon',
    //             iconColor: '#0095b6'
    //         }))
    //
    // }
>>>>>>> c205b6e0e5636dca59b375e200c75f84f1664ecd


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

<<<<<<< HEAD

                balloonPopUp.addEventListener('click', (e) => {
                    console.log('second click');
                });

=======
>>>>>>> c205b6e0e5636dca59b375e200c75f84f1664ecd
            }
        })

}
<<<<<<< HEAD
function dataForm(myMap, coords) {
    buttonSave.addEventListener('click', () => {


        console.log('test');
=======
// function fn(coords){
//     let placemarks = new ymaps.Placemark(coords, {
//         balloonContent: 'Это новая точка'
//     }, {
//         preset: 'islands#icon',
//         iconColor: '#0095b6'
>>>>>>> c205b6e0e5636dca59b375e200c75f84f1664ecd
    })

    return placemarks;
}

buttonSave.addEventListener('click', () => {

    let reviewObj = dataItem();
    // Сохраняю данные в стородж
    storage.data = JSON.stringify(dataReview.push(reviewObj));

    // Создаем кластер

    let clusterer = new ymaps.Clusterer({
        // Используем макет балуна кластера "карусель"
        clusterBalloonContentBodyLayout: "cluster#balloonCarouselContent",
        // Используем собственный подмакет для отображения информации о геообъекте
        clusterBalloonContentItemLayout: ClusterBalloonContentItemLayout,
        // Устанавливаем ограничение на количество элементов в нижней панели
        clusterBalloonPagerSize: 5,

        // Установка внешнего вида нижней панели.
        // Режим marker рекомендуется использовать с небольшим количеством элементов.
        // clusterBalloonPagerType: 'marker',

        clusterBalloonWidth: 220
    });







    clusterer.add(fn());
    myMap.geoObjects.add.add(clusterer);

    userName.value = '';
    place.value = '';
    review.value = '';

})

function dataItem(coords) {
    // Создаем объект с данными
    let item = {
        coords: coords,
        date: date,
        time: time,
        name: userName.value,
        place: place.value,
        review: review.value,
        adress: adressPoint.textContent
    };

    // Записываем данные в массив

    // console.log('test' , dataReview);
    return item;
}


