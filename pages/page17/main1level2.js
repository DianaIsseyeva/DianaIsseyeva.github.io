const createUrl = function () {
    const nameInput = document.getElementById('country-name').value;
    let urlMain = new URL('https://restcountries.eu/rest/v2/name/');
    let newUrl = new URL(`${nameInput}`, urlMain);
    newUrl = newUrl.href;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", newUrl);
    xhr.send();
    xhr.addEventListener("load", function () {
        if (this.status === 404) {
            alert('Ошибка! Такой страны не существует.')
        } else {
            let resp = JSON.parse(this.responseText);

            const respName = resp[0].name;
            const name = document.getElementById('name');
            name.innerHTML = respName;

            const respRegion = resp[0].region;
            const region = document.getElementById('region');
            region.innerHTML = respRegion;

            const respSubregion = resp[0].subregion;
            const subregion = document.getElementById('subregion');
            subregion.innerHTML = respSubregion;

            const respCapital = resp[0].capital;
            const capital = document.getElementById('capital');
            capital.innerHTML = respCapital;

            const respFlag = resp[0].flag;
            const flagContent = `<img src='${respFlag}' alt='flag' width=150>`;
            flag.innerHTML = flagContent;
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("show").addEventListener('click', createUrl);
})