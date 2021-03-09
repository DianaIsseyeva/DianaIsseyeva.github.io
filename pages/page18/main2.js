$(document).ready(() => {

    $.ajax({
        method: 'GET',
        url: 'https://restcountries.eu/rest/v2/all?fields=name',
        async: false,
        success: function (response) {
            for (let i = 0; i < 20; i++) {
                let country = response[i].name;
                let urlMain = new URL('https://restcountries.eu/rest/v2/name/');
                let newUrl = new URL(`${country}`, urlMain);
                newUrl = newUrl.href;
                $.ajax({
                    method: 'GET',
                    url: `${newUrl}`,
                    async: false,
                    success: function (resp) {
                        let content = "<table>"
                        content += '<tr><td>' + 'Code' + '</td> <td>' + 'Flag' + '</td> <td>' + 'Name' + '</td> <td>' + 'Capital' + '</td> <td>' + 'Population' + '</td> </tr>'
                        content += '<tr><td>' + `${resp[0].alpha2Code}` + '</td> <td>' + `<img src='${resp[0].flag}' alt='flag' width=150>` + '</td> <td>' + `${resp[0].name}` + '</td> <td>' + `${resp[0].capital}` + '</td> <td>' + `${resp[0].population}` + '</td></tr>';
                        content += "</table>"
                        $('#here_table').append(content);
                    }
                });
            }
        }
    });
})