$(document).ready(() => {
    let element = 0;
    let lengthObject = 0;
    let key = 0;

    const observer = new Observer();
    observer.on('search', () => {
        let url = createUrl();
        observer.trigger('new_request', url);
    });
    observer.on('new_request', (url) => {
        getRequest(url);
    });

    const observer2 = new Observer();
    observer2.on('ingridients', () => {
        let url = createUrl();
        observer2.trigger('show_ingidients', url);
    });
    observer2.on('show_ingidients', (url) => {
        clearModal();
        openModal(url, element);
    });

    function clearModal() {
        const lastIngridients = $('#ingridients');
        lastIngridients.html('');
        const lastInstructions = $('#instructions');
        lastInstructions.html('');
    }

    function createUrl() {
        const name = $('.form-control').val();
        let urlMain = 'https://www.thecocktaildb.com/api/json/v1/1/';
        const nameCocktail = `search.php?s=${name}`;
        let newUrl = new URL(`${nameCocktail}`, urlMain);
        newUrl = newUrl.href;
        return newUrl;
    }

    function getRequest(url) {
        $.ajax({
            method: 'GET',
            url: `${url}`,
            async: false,
            success: function (response) {
                for (let i = 0; i < response.drinks.length; i++) {
                    const item = $('<div class="row card-size"></div>');
                    const contentsItem =
                        `<div class = "card " id = ${response.drinks[i].strDrink}>
                        <a href = '#' class = "link_card" data-toggle="modal" data-target="#myModal">
                            <img src = "${response.drinks[i].strDrinkThumb}" class = "card-img-top" alt = "${response.drinks[i].strDrink}" >
                                <div class = "card-body" >
                                    <h5 class = "card-title" id = "name_${response.drinks[i].strDrink}" > ${response.drinks[i].strDrink}</h5> 
                                </div> 
                        </a>
                        </div>`;
                    item.html(contentsItem);
                    $('#card_content').append(item);
                }
            }
        });
    }

    const getObjectSize = function (obj) {

        for (key in obj) {
            if (obj.hasOwnProperty(key)) lengthObject++;
        }
        return lengthObject;
    };

    function openModal(url, element) {
        $.ajax({
            method: 'GET',
            url: `${url}`,
            async: false,
            success: function (response) {
                let index_cocktail = 0;
                for (let i = 0; i < response.drinks.length; i++) {
                    if (response.drinks[i].strDrink === element) {
                        index_cocktail = i;
                    }
                }

                const currentCocktail = response.drinks[index_cocktail];
                console.log(currentCocktail);

                getObjectSize(currentCocktail);
                let ingridientsArray = [];
                for (let i = 1; i < lengthObject; i++) {

                    //ингридиент
                    for (const value in response.drinks[index_cocktail]) {
                        let ingridient = 'strIngredient' + '' + i;
                        if (value === ingridient && response.drinks[index_cocktail][value] !== null) {
                            const element = $(`<div id = ${i}></div>`);
                            $('#ingridients').append(element);
                            $(`#${i}`).append(response.drinks[index_cocktail][value]);
                            ingridientsArray.push((response.drinks[index_cocktail][value]));
                            break;
                        }
                    }

                    // дозировка
                    for (const value in response.drinks[index_cocktail]) {
                        let ingridientMeasure = 'strMeasure' + '' + i;
                        if (value === ingridientMeasure && response.drinks[index_cocktail][value] !== null) {
                            $(`#${i}`).append(' ' + '(' + response.drinks[index_cocktail][value] + ')');
                            break;
                        }
                    }
                }

                //картинка ингридиента
                for (let j = 0; j < ingridientsArray.length; j++) {
                    let urlAllImages = "https://www.thecocktaildb.com/images/ingredients/";
                    if (ingridientsArray[j] !== null) {
                        let currentImage = ingridientsArray[j].toLowerCase() + '-' + 'Small.png';
                        let newUrl = new URL(currentImage, urlAllImages);
                        newUrl = newUrl.href;
                        const image = `<img src='${newUrl}' alt='ingridient'>`;
                        $(`#${j+1}`).prepend(image);
                    }
                }

                // инструкция
                for (const value in currentCocktail) {
                    if (value === 'strInstructions') {
                        $('#instructions').append(currentCocktail[value]);
                        break;
                    }
                }
            }
        })
    }

    $("#btn_search").on('click', () => observer.trigger('search'));
    $(document).on('click', '.link_card', () => observer2.trigger('ingridients'));

    $(document).on('click', '.link_card', e => {
        element = $(e.currentTarget);
        element = element.text();
        element = $.trim(element);
        console.log(element);
        return element;
    })
})