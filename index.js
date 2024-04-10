document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.dataset.name;
            const itemPrice = parseFloat(button.dataset.price);

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${itemName}</span>
                <span class="item-price">R$ ${itemPrice.toFixed(2)}</span>
                <input class="item-quantity" type="number" value="1" min="1">
                <button class="remove-item">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            updateTotal();

            const removeItemButtons = document.querySelectorAll('.remove-item');
            removeItemButtons.forEach(removeButton => {
                removeButton.addEventListener('click', () => {
                    removeButton.parentElement.remove();
                    updateTotal();
                });
            });

            const quantityInputs = document.querySelectorAll('.item-quantity');
            quantityInputs.forEach(input => {
                input.addEventListener('input', () => {
                    updateTotal();
                });
            });
        });
    });

    function updateTotal() {
        const prices = Array.from(document.querySelectorAll('.cart-item .item-price'))
                        .map(span => parseFloat(span.textContent.replace('R$ ', '')));
        const quantities = Array.from(document.querySelectorAll('.item-quantity'))
                            .map(input => parseInt(input.value));
        
        const total = prices.reduce((acc, curr, index) => acc + curr * quantities[index], 0);
        document.getElementById('total-price').textContent = `Total: R$ ${total.toFixed(2)}`;
    }
});
