/* ==========================================
   A Square Premium Website
   script.js - Part 1
========================================== */

// Loader
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1800);
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";
});

// Back To Top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

// Mobile Menu
const menuBtn = document.getElementById("menuBtn");

const navLinks = document.querySelector(".nav-links");

menuBtn.onclick = () => {

    navLinks.classList.toggle("show");

};

// Shopping Cart

let cart = [];

const cartButtons = document.querySelectorAll(".cart-btn");

const cartItems = document.getElementById("cartItems");

const cartDrawer = document.getElementById("cartDrawer");

const cartBtn = document.getElementById("cartBtn");

cartBtn.onclick = () => {

    cartDrawer.classList.toggle("active");

};

cartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.parentElement;

        const name = card.querySelector("h3").innerText;

        const price = card.querySelector("h4").innerText;

        cart.push({

            name,

            price

        });

        updateCart();

    });

});

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        return;

    }

    cart.forEach((item, index) => {

        cartItems.innerHTML += `

<div class="cart-item">

<div>

<h4>${item.name}</h4>

<p>${item.price}</p>

</div>

<button onclick="removeItem(${index})">

❌

</button>

</div>

`;

    });

}

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}
/* ==========================================
   WhatsApp Checkout
========================================== */

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const placeOrder = document.getElementById("placeOrder");

checkoutBtn.onclick = () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    checkoutModal.classList.add("active");
};

placeOrder.onclick = () => {

    const inputs = checkoutModal.querySelectorAll("input");

    const name = inputs[0].value.trim();
    const phone = inputs[1].value.trim();
    const address = inputs[2].value.trim();
    const city = inputs[3].value.trim();
    const pincode = inputs[4].value.trim();

    if (!name || !phone || !address || !city || !pincode) {
        alert("Please fill all details.");
        return;
    }

    let orderText = "";

    cart.forEach((item) => {
        orderText += `• ${item.name} (${item.price})\n`;
    });

    const message =
`🛒 *New Order - A Square*

👤 Name: ${name}

📞 Phone: ${phone}

🏠 Address:
${address}

🏙️ City: ${city}

📮 Pincode: ${pincode}

📦 Products:
${orderText}

Thank you!`;

    const whatsappURL =
`https://wa.me/918830626573?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
};

/* ==========================================
   Product Search
========================================== */

const searchInput = document.querySelector(".product-search input");

if (searchInput) {

searchInput.addEventListener("keyup", () => {

const value = searchInput.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card => {

const name = card.querySelector("h3").innerText.toLowerCase();

card.style.display = name.includes(value) ? "block" : "none";

});

});

}

/* ==========================================
   Fade Animation On Scroll
========================================== */

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".fade").forEach(el=>{

observer.observe(el);

});

/* ==========================================
   Close Cart When Clicking Outside
========================================== */

window.addEventListener("click",(e)=>{

if(
!cartDrawer.contains(e.target) &&
!cartBtn.contains(e.target)
){
cartDrawer.classList.remove("active");
}

});

/* ==========================================
   Close Checkout With ESC
========================================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

checkoutModal.classList.remove("active");

}

});

/* ==========================================
   Finished
========================================== */

console.log("A Square Website Loaded Successfully 🚀");
