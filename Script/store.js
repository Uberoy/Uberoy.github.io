const main = document.getElementById("main");
const boostergroup = document.getElementById("boostergroup");
const cardgroup = document.getElementById("cardgroup");
const modals = document.getElementById("modals");
const cartTable = document.getElementById("cart-table");
const cart = document.getElementById("cart");
const cartButton = document.getElementById("cart-button");
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", ClearCart);
const cartTotal = document.getElementById("cart-total");
cartTotal.addEventListener("click", ChangeCurrency);


const cartArray = [];

class Product{
    constructor(productType, id, name, shortDescription, description, price)
    {
        this.productType = productType || "";
        this.id = id || "";
        this.name = name || "";
        this.shortDescription = shortDescription || "";
        this.description = description || "";
        this.price = price || "";
    }
}

function AddToCart(name, price)
{
  cartArray.push([name, price]);
  const tbody = cartTable.querySelector("tbody");
  const newRow = tbody.insertRow();
  const newCell = newRow.insertCell();
  const newCell2 = newRow.insertCell();
  newCell.textContent = `[${name}]`;
  newCell.classList.add("align-left");
  newCell2.textContent = `${price} kr`;
  newCell2.classList.add("align-right");

  let cartTotalCost = 0;
  for (const product of cartArray) 
  {
    cartTotalCost += product[1];
  }
  
  cartTotal.innerText = `Totalt: ${cartTotalCost} kr`;
}

function ClearCart()
{
  cartArray.length = 0;

  const tableBody = cartTable.getElementsByTagName("tbody")[0];
  if (tableBody) 
  {
    tableBody.innerHTML = "";
  }

  let cartTotalCost = 0;
  cartTotal.innerText = `Totalt: ${cartTotalCost} kr`;
}

function ChangeCurrency()
{
  let cartTotalCost = 0;
  for (const product of cartArray) 
  {
    cartTotalCost += product[1];
  }

  const host = "api.frankfurter.app";
  if(cartTotalCost > 0)
  {
    fetch(`https://${host}/latest?amount=${cartTotalCost}&from=SEK&to=USD`).then(resp => resp.json()).then((data) => {alert(`${cartTotalCost} SEK = ${data.rates.USD} USD`);});
  }
  else
  {
    alert(`Kan inte konvertera 0 kr`);
  }
}

const products = [
  new Product(1, "Booster1", "Booster Pack 1", "9 random cards", "De allra första korten som skapats till Magichans TCG i ett och samma paket!", 50),
  new Product(1, "Booster2", "Booster Pack 2", "9 random cards", "Lite nyare, mycket bättre!", 100),
  new Product(1, "Booster3", "Phantom Shadows", "2000 random cards", "Ganska sisådär bilder faktiskt", 2500),
  new Product(2, "unit_AggresiveArthur", "Aggresive Arthur", "BP1-001", "Lorem Ipsum...", 5),
  new Product(2, "unit_Channeler", "Channeler", "BP1-002", "Lorem Ipsum...", 5),
  new Product(2, "unit_CorpseCollector", "Corpse Collector", "BP1-003", "Lorem Ipsum...", 5),
  new Product(2, "unit_MagicDevourer", "Magic Devourer", "BP1-004", "Lorem Ipsum...", 5),
  new Product(2, "unit_MenacingMendez", "Menacing Mendez", "BP1-005", "Lorem Ipsum...", 5),
  new Product(2, "unit_SpiritLinker", "Spirit Linker", "BP1-006", "Lorem Ipsum...", 5),
  new Product(2, "unit_StreetDancer", "Street Dancer", "BP1-007", "Lorem Ipsum...", 5),
  new Product(2, "unit_technomancer", "Technomancer", "BP1-008", "Lorem Ipsum...", 5),
  new Product(2, "equip_barrier", "Barrier Belt", "BP1-009", "Lorem Ipsum...", 5),
  new Product(2, "fast_VampiricTouch", "Vampiric Touch", "BP1-010", "Lorem Ipsum...", 5),
  new Product(2, "slow_PowerOfFriendship", "Power of Friendship", "BP1-011", "Lorem Ipsum...", 5),
  new Product(2, "slow_Rewind", "Rewind", "BP1-011", "Lorem Ipsum...", 5),
  new Product(2, "slow_SummoningAssistance", "Summoning Assistance", "BP1-012", "Lorem Ipsum...", 5),
  new Product(2, "slow_Sword", "Wish For a Big Sword", "BP1-013", "Lorem Ipsum...", 5),
  new Product(2, "unit_FireDjinn", "Fire Djinn", "BP2-001", "Lorem Ipsum...", 5),
  new Product(2, "unit_Industrial", "Industrial Fire Mage", "BP2-002", "Lorem Ipsum...", 5),
  new Product(2, "unit_Sprite", "Sprite Princess", "BP2-003", "Lorem Ipsum...", 5),
  new Product(2, "unit_Undead", "Undead Warrior", "BP2-004", "Lorem Ipsum...", 5),
  new Product(2, "unit_WaterSpirit", "Water Spirit", "BP2-005", "Lorem Ipsum...", 5),
  new Product(2, "fast_hotFeet", "Hot Feet", "BP2-006", "Lorem Ipsum...", 5),
  new Product(2, "fast_Hydropump", "Hydropump", "BP2-007", "Lorem Ipsum...", 5),
  new Product(2, "fast_Teleport", "Teleport", "BP2-008", "Lorem Ipsum...", 5),
  new Product(2, "fast_Tsunami", "Tsun-Tsunami", "BP2-009", "Lorem Ipsum...", 5),
  new Product(2, "slow_overload", "Overload", "BP2-010", "Lorem Ipsum...", 5),
  new Product(2, "permanent_RecyclingFactory", "Recycling Factory", "BP2-011", "Lorem Ipsum...", 5),

];

for (const product of products) 
{
  const cardModal = document.createElement("div");
  cardModal.classList.add("modal");
  cardModal.classList.add("fade");
  cardModal.id = product.id; //ska vara en variabel (id)

  const cardModalDialog = document.createElement("div");
  cardModalDialog.classList.add("modal-dialog");

  const cardModalContent = document.createElement("div");
  cardModalContent.classList.add("modal-content");

  const cardModalHeader = document.createElement("div");
  cardModalHeader.classList.add("modal-header");

  const cardModalHeaderH1 = document.createElement("h1");
  cardModalHeaderH1.innerText = product.name; //ska vara en variabel (name)

  const cardModalHeaderButton = document.createElement("button");
  cardModalHeaderButton.classList.add("btn-close");
  cardModalHeaderButton.setAttribute("data-bs-dismiss", "modal");
  cardModalHeaderButton.setAttribute("data-bs-target", product.id); //ska vara en variabel (id)

  const cardModalBody = document.createElement("div");
  cardModalBody.classList.add("modal-body");

  const cardModalBodyImage = document.createElement("img");
  cardModalBodyImage.classList.add("mb-3");
  cardModalBodyImage.classList.add("mx-auto");
  cardModalBodyImage.classList.add("d-block");
  cardModalBodyImage.src = `./Images/Products/${product.productType}/${product.id}.png`; //ska vara en variabel (id)
  cardModalBodyImage.alt = product.name; //ska vara en variabel (name)

  const cardModalBodyTable = document.createElement("table");
  cardModalBodyTable.classList.add("table");
  cardModalBodyTable.classList.add("table-striped");

  const cardModalBodyTableBody = document.createElement("tbody");

  const cardModalBodyTableBodyRow1 = document.createElement("tr");

  const cardModalBodyTableBodyRow1Cell1 = document.createElement("td");
  cardModalBodyTableBodyRow1Cell1.innerText = "Description: ";

  const cardModalBodyTableBodyRow1Cell2 = document.createElement("td");
  cardModalBodyTableBodyRow1Cell2.innerText = product.description;

  const cardModalBodyTableBodyRow2 = document.createElement("tr");

  const cardModalBodyTableBodyRow2Cell1 = document.createElement("td");
  cardModalBodyTableBodyRow2Cell1.innerText = "Innehåller: ";

  const cardModalBodyTableBodyRow2Cell2 = document.createElement("td");
  cardModalBodyTableBodyRow2Cell2.innerText = product.shortDescription;

  const cardModalBodyTableBodyRow3 = document.createElement("tr");
  const cardModalBodyTableBodyRow3Cell1 = document.createElement("td");
  cardModalBodyTableBodyRow3Cell1.innerText = "Pris: ";

  const cardModalBodyTableBodyRow3Cell2 = document.createElement("td");
  cardModalBodyTableBodyRow3Cell2.innerText = product.price + " kr";

  const cardModalFooter = document.createElement("div");
  cardModalFooter.classList.add("modal-footer");

  const cardModalFooterButton = document.createElement("button");
  cardModalFooterButton.classList.add("btn");
  cardModalFooterButton.classList.add("btn-primary");
  cardModalFooterButton.setAttribute("data-bs-dismiss", "modal");
  cardModalFooterButton.setAttribute("data-bs-target", product.id); //Ska vara en variabel (id)
  cardModalFooterButton.innerText = "Stäng";

  const cardModalFooterButtonBuy = document.createElement("button");
  cardModalFooterButtonBuy.classList.add("btn");
  cardModalFooterButtonBuy.classList.add("btn-success");
  // cardModalFooterButtonBuy.addEventListener("click", function(){cart.push([product.name, product.price])});
  cardModalFooterButtonBuy.addEventListener("click", () => {AddToCart(product.name, product.price)});
  
  cardModalFooterButtonBuy.innerText = "Lägg i kundvagn";
  /*********************************/

  cardModal.append(cardModalDialog);
  cardModalDialog.append(cardModalContent);

  cardModalContent.append(cardModalHeader);
  cardModalHeader.append(cardModalHeaderH1);
  cardModalHeader.append(cardModalHeaderButton);

  cardModalContent.append(cardModalBody);
  cardModalBody.append(cardModalBodyImage);

  cardModalBody.append(cardModalBodyTable);
  cardModalBodyTable.append(cardModalBodyTableBody);

  cardModalBodyTableBody.append(cardModalBodyTableBodyRow1);
  cardModalBodyTableBodyRow1.append(cardModalBodyTableBodyRow1Cell1);
  cardModalBodyTableBodyRow1.append(cardModalBodyTableBodyRow1Cell2);

  cardModalBodyTableBody.append(cardModalBodyTableBodyRow2);
  cardModalBodyTableBodyRow2.append(cardModalBodyTableBodyRow2Cell1);
  cardModalBodyTableBodyRow2.append(cardModalBodyTableBodyRow2Cell2);

  cardModalBodyTableBody.append(cardModalBodyTableBodyRow3);
  cardModalBodyTableBodyRow3.append(cardModalBodyTableBodyRow3Cell1);
  cardModalBodyTableBodyRow3.append(cardModalBodyTableBodyRow3Cell2);

  cardModalContent.append(cardModalFooter);
  cardModalFooter.append(cardModalFooterButton);
  cardModalFooter.append(cardModalFooterButtonBuy);

  modals.append(cardModal);

  ///////////////////////////////////

  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("btn");
  card.classList.add("col-2");
  card.classList.add("m-3");
  card.setAttribute("data-bs-toggle", "modal");
  card.setAttribute("data-bs-target", `#${product.id}`); //ska vara en variabel (id)

  const image = document.createElement("img");
  image.classList.add("card-img-top");
  image.src = `./Images/Products/${product.productType}/${product.id}.png`; //ska vara en variabel (id)
  image.alt = product.name; //ska vara en variabel (name)

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h4");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = product.name; //ska vara en variabel (name)

  const cardSubtitle = document.createElement("span");
  cardSubtitle.classList.add("card-subtitle");
  cardSubtitle.innerText = product.shortDescription; //ska vara en variabel (shortDescription)

  const cardText = document.createElement("div");
  cardText.classList.add("card-text");
  cardText.innerText = product.price + " kr"; //ska vara en variabel (price)

  /*********************************/

  card.append(image);
  cardBody.append(cardTitle);
  cardBody.append(cardSubtitle);
  cardBody.append(cardText);
  card.append(cardBody);

  if(product.productType == 1)
  {
    boostergroup.append(card);
  }
  else if(product.productType == 2)
  {
    cardgroup.append(card);
  }

  ///////////////////////////////////

}