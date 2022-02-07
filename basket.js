"use strict";

const basketEl = document.querySelector('.basket');
const cartIconWrapEl = document.querySelector('.cartIconWrap');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const cartIconWrapSpan = document.querySelector('.cartIconWrap span');

cartIconWrapEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = [];

const featuredItemsEl = document.querySelector('.featuredItems');

featuredItemsEl.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem')
    const elId = featuredItemEl.dataset.id;
    const elName = featuredItemEl.dataset.name;
    const elPrice = Number(featuredItemEl.dataset.price);
    addToCard(elId, elName, elPrice);
})

function addToCard(elId, elName, elPrice) {
    let addItem = null;
    let countOfItem = 0;
    let basketTotalValue = 0;
    const basketHeader = document.querySelector('.basketHeader');

    basket.forEach((element, idx) => {
        basketTotalValue += element.price;
        if (element.id === elId) {
            addItem = idx;
            countOfItem += 1;
        }
    });

    if (addItem !== null) {
        const editItem = document.querySelector(`[class = "basketRow"][data-id="${elId}"]`);
        editItem.querySelector('.basketRowCount').innerText = `${countOfItem + 1}`;
        editItem.querySelector('.basketRowTotalPrice').innerText = `${(countOfItem + 1) * elPrice}`;
    }
    else {
        const newAddItem = `
        <div class="basketRow" data-id=${elId}>
        <div class="basketRowName">${elName}</div>
        <div class="basketRowCount">${1}</div>
        <div class="basketRowPrice">${elPrice}</div>
        <div class="basketRowTotalPrice">${elPrice}</div>
    </div>
        `
        basketHeader.insertAdjacentHTML('afterend', newAddItem);
    }

    basket.push({ id: elId, name: elName, price: elPrice });
    basketTotalValueEl.innerText = `${basketTotalValue + elPrice}`;
    cartIconWrapSpan.innerText = `${basket.length}`;
}