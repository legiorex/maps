let mapBlock = document.querySelector('.content');
const adresPoint = document.querySelector('.top__header');
const balloonPopUp = document.querySelector('.balloon');
const buttonSave = document.querySelector('.bottom__button-add');
const userName = document.querySelector('.name-user').value;
const place = document.querySelector('.place').value;
const review = document.querySelector('.review').value;


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



        getAddress(coords);
        clikMap();
        dataForm(myMap, coords);

    });

// Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            adresPoint.textContent = firstGeoObject.getAddressLine();
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


function clikMap() {
    mapBlock.addEventListener('click', (e) => {
        // balloonPopUp.classList.remove('hide');
        // balloonPopUp.style.left = e.pageX + 'px';
        // balloonPopUp.style.top = e.pageY + 'px';
        // console.log(balloonPopUp.style.left);
        // console.log(balloonPopUp.offsetWidth + 'ширина');
        // console.log(e.pageX + 'координаты х')
        //
        // balloonPopUp.addEventListener('click', (e) => {
        //     console.log('second click');
        console.log(isClickForm(e));
            if(!isClickForm(e)){
                balloonPopUp.classList.remove('hide');
                balloonPopUp.style.left = e.pageX + 'px';
                balloonPopUp.style.top = e.pageY + 'px';


                balloonPopUp.addEventListener('click', (e) => {
                    console.log('second click');
                });

            }
        })


}
function dataForm(myMap, coords) {
    buttonSave.addEventListener('click', () => {


        console.log('test');
    })
}


