var shoppingCart = (function () {

    var cart = [];
    var books = [{
        id: 'book1',
        name: 'Everything is F*cked',
        price: 912.00,
        imageUrl: 'https://fully-booked.ap-south-1.linodeobjects.com/catalog/product/cache/926507dc7f93631a094422215b778fe0/9/7/9780062888464-1.jpg',
    },
    {
        id: 'book2',
        name: 'How to Be Everything',
        price: 899.00,
        imageUrl: 'https://fully-booked.ap-south-1.linodeobjects.com/catalog/product/cache/926507dc7f93631a094422215b778fe0/9/7/9780062566669front.jpg',
    },
    {
        id: 'book3',
        name: 'Atomic Habits',
        price: 1053.00,
        imageUrl: 'https://fully-booked.ap-south-1.linodeobjects.com/catalog/product/cache/926507dc7f93631a094422215b778fe0/9/7/9780735211292-1_2.jpg',
    },
    {
        id: 'book4',
        name: 'The Power of Habit',
        price: 953.00,
        imageUrl: 'https://fully-booked.ap-south-1.linodeobjects.com/catalog/product/cache/926507dc7f93631a094422215b778fe0/9/7/9780812981605_1.jpg',
    },
]

    function Item(name, price, count) {
        this.name = name
        this.price = price
        this.count = count
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();



    // Public methods and properties
    var obj = {};
    obj.books = books;

    obj.addItemToCart = function (name, price, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count += count;
                saveCart();
                return;
            }
        }

        console.log("addItemToCart:", name, price, count);

        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCart = function (name) { 
        // Removes one item
        for (var i in cart) {
            if (cart[i].name === name) { 
                cart[i].count--; 
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCartAll = function (name) { // removes all item name
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.clearCart = function () {
        cart = [];
        saveCart();
    }


    obj.countCart = function () { 
        // return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function () { 
        //return total cost
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    obj.listCart = function () { // -> array of Items
        var cartCopy = [];
        console.log("Listing cart");
        console.log(cart);
        for (var i in cart) {
            console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    return obj;
})();