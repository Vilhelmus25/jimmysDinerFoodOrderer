import { menuArray } from './data.js'

const displayItems = document.getElementById('items')
const payButton = document.getElementById('payButton')
let targetId = ''
let orderStack = []
let isModalVisible = false
let thanksGiving = ''

document.addEventListener('click', function (e) {

    if (e.target.dataset.plus) {
        handleAddItem(e.target.dataset.plus)
    }
    else if (e.srcElement.className == "submitOrder") {
        cardModal()
    }
    else if (e.srcElement.className == "pay") {
        modalHider()
        thanksGiver()
    }
    else if (e.srcElement.className == "remove") {
        // console.log(e.target.dataset.stack)
        // a stack mondja meg, hogy hanyadik elem lesz az amit kiakarunk majd venni
        handleRemoveItem(e.target.dataset.remove, e.target.dataset.stack)
    }

})

function handleAddItem(targetId) {

    menuArray.forEach(function (item) {
        if (item.id == targetId) {
            orderStack.push(item)
        }
    })
    getFeedHtml()

}

function handleRemoveItem(targetId, stackId) {


    menuArray.forEach(function (item) {
        if (item.id == targetId) {

            if (orderStack.length > 1) {
                orderStack.splice(stackId, 1)
            }
            else {
                orderStack.pop()
            }

        }
        getFeedHtml()

    })

}

function cardModal() {
    isModalVisible = true;
    getFeedHtml()
    document.getElementById('modal').classList.remove('hidden')
    document.getElementById('modal').classList.add('reveal')
}

function modalHider() {
    document.getElementById('modal').classList.remove('reveal')
    document.getElementById('modal').classList.add('hidden')
    orderStack = [];
    getFeedHtml()
}

function thanksGiver() {
    thanksGiving = `<p class="sayThanks">Thanks, James! Your order is on its way!</p>`
    getFeedHtml()
}

function render() {


    let orderCheckout = ''
    let sumOfOrderedItems = 0
    if (orderStack.length > 0) {
        orderCheckout += `
            <h2 class="orderTitle">Your Order</h2>
        `
        orderStack.forEach(function (item, index) { // az index a forEach aktuális indexelését mutatja, ez kell majd a data-stack-nél, hogy megkapja az adott tétel, hogy hanyadik a veremben.
            orderCheckout += `
            <div class="orderedItemLine">
                <div class="orderedItemLineLeft">
                    <p class="orderedItemName">${item.name}</p>
                    <p class="remove" id="removeItem" data-remove="${item.id}" data-stack="${index}"> REMOVE </p>
                </div
                <div class="orderedItemLineRight">
                    <p class="orderedItemPrice">$${item.price}</p>
                </div
            </div>
            `
            sumOfOrderedItems += item.price
        })
        orderCheckout += `
            <div class="checkout">
                <hr class="strong">
                <div class="totalPrice">
                    <p class="totalPriceLabel">Total price:</p>
                    <p class="sumOfOrderedItems">$${sumOfOrderedItems}</p>
                </div>
                <button class="submitOrder" id="completeOrder">Complete order</button>
            </div>
        `
    }

    let modalPage = ''
    modalPage +=
        `
            <div class="modal hidden" id="modal">
                <p class="enterText">Enter card details</p>
                <textarea class="enterName enter" placeholder="Enter your name"></textarea>
                <textarea class="enterCardNumber enter" placeholder="Enter card number"></textarea>
                <textarea class="enterCVV enter" placeholder="Enter CVV"></textarea>
                <button class="pay" id="payButton">Pay</button>
            </div>
        `
    let html = ''



    menuArray.forEach(function (item) {
        html += `
    <div class="menu">
        <div class="segment">
            <div class="item">
                <span class="itemEmoji">${item.emoji}</span>
                <div class="itemStats">
                    <p class="itemName">${item.name}</p>
                    <p class="itemIngr">${item.ingredients}</p>
                    <p class="itemPrice">$${item.price}</p>
                </div> 
            </div>
            <div class="addToCart">
                <span class="addItem">
                    <i class="fa fa-circle-plus plus" id="addToCart" data-plus="${item.id}"></i>
                </span>
            </div>
        </div>
        <hr class="solid">
    </div>
    `

    })

    html += `
    <div class="orderListMain">
        ${orderCheckout}
    </div>   
    `
    html += `<div class="modalMain">${modalPage}</div>`

    html += `<div class="thanksDiv">${thanksGiving}</div>`

    return html
}

function getFeedHtml() {                             // this is required in order to be able to call the render() multiple times
    document.getElementById('items').innerHTML = render()

}
getFeedHtml()

