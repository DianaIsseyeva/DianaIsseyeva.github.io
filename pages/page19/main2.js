class PiggyBank {
    constructor() {
        this.validCoins = [1, 3, 5, 10];
        this.coins = {
            1: 0,
            3: 0,
            5: 0,
            10: 0
        };
        this.totalMoney = 0;
    }

    addCoin(nominal) {
        this.coins[nominal]++;
        this.showBank(nominal);
    }

    showBank(value) {
        const amount = document.getElementById(`${value}`);
        const contentsAmount = ` <p class="current_coin" id= "${value}">
        ${value} : ${this.coins[value]}
        </p>`;
        amount.innerHTML = contentsAmount;

        this.getTotal();

        const total = document.getElementById("current_money");
        const contentsTotal = ` <p class="current_coin" id="current_money">
        Total: <b>${piggyBank.totalMoney}</b>
        </p>`;
        total.innerHTML = contentsTotal;
        document.getElementById('infoBank').prepend(total);
    }

    getTotal() {
        const nominals = Object.keys(this.coins);
        let total = 0;
        for (let coin of nominals) {
            const counter = this.coins[coin];
            total += parseInt(coin) * counter;
            this.totalMoney = total;
        }
        return total;
    }
}

piggyBank = new PiggyBank();

const total = document.createElement("div");
const contentsTotal = ` <p class= "coin_initial" id="current_money">
    Total: <b>${piggyBank.totalMoney}</b>
    </p>`;
total.innerHTML = contentsTotal;
document.getElementById('infoBank').prepend(total);

let i = 0;
while (i < piggyBank.validCoins.length) {
    const item = document.createElement("div");
    const contentsItem = `<p class= "coin_initial" id = "${piggyBank.validCoins[i]}">
    ${piggyBank.validCoins[i]} : 0
    </p>`;
    item.innerHTML = contentsItem;
    document.getElementById('infoBank').append(item);
    i++;
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btn_1").addEventListener('click', () => piggyBank.addCoin(1));
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btn_3").addEventListener('click', () => piggyBank.addCoin(3));
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btn_5").addEventListener('click', () => piggyBank.addCoin(5));
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btn_10").addEventListener('click', () => piggyBank.addCoin(10));
});