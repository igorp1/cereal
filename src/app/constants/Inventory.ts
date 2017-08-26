interface InventoryItem {
    name : String,
    image : String,
    description : String,
    buyLink : String,
    cost : Number,
    servings : Number
}


interface Inventroy {
    milk : Array<InventoryItem>,
    cereal : Array<InventoryItem>,
    toppings : Array<InventoryItem>,
    bowls : Array<InventoryItem>,
    bottles : Array<InventoryItem>,
    spoons : Array<InventoryItem>
}

function buildInventoryItem( n: string, i: string, d: string, l: string, c: Number) : InventoryItem{
    return {
        name : n,
        image : i,
        description : d,
        buyLink : l,
        cost : c, 
        servings : -1
    };
}


//===========================
//=========  MILK ===========
//===========================
const MILK : Array<InventoryItem> = [
    buildInventoryItem("Regular Milk","","","",0),
    buildInventoryItem("Skim Milk","","","",0),
    buildInventoryItem("Almond Milk","","","",0),
    buildInventoryItem("Chocolate Milk","","","",0),
    buildInventoryItem("2% Milk","","","",0),
    buildInventoryItem("Fat free Milk","","","",0),
];

//===========================
//========  CEREAL ==========
//===========================
const CEREAL : Array<InventoryItem> = [
    buildInventoryItem("Cap’n Crunch","","","",0),
    buildInventoryItem("Cocoa Puffs","","","",0),
    buildInventoryItem("Frosted Flakes","","","",0),
    buildInventoryItem("Fruit Loops (gf)","","","",0),
    buildInventoryItem("Honey Nut Cheerios","","","",0),
    buildInventoryItem("Lucky Charms","","","",0),
    buildInventoryItem("Special K","","","",0)
];

//===========================
//=======  TOPPINGS =========
//===========================
const TOPPINGS : Array<InventoryItem> = [
    buildInventoryItem("Strawberry compote","","","",0),
    buildInventoryItem("Coconut","","","",0),
    buildInventoryItem("Marshmallows","","","",0),
    buildInventoryItem("Oreo","","","",0),
    buildInventoryItem("M&Ms","","","",0),
    buildInventoryItem("Reese’s Pieces","","","",0),
    buildInventoryItem("Pecans","","","",0),
    buildInventoryItem("Raisins","","","",0),
    buildInventoryItem("Bananas","","","",0)
];

//===========================
//=========  BOWLS ==========
//===========================
const BOWLS : Array<InventoryItem> = [
    buildInventoryItem("Regular bowl","","","",0),
    buildInventoryItem("Large bowl","","","",0),
];

//===========================
//========  BOTTLES =========
//===========================
const BOTTLES : Array<InventoryItem> = [
    buildInventoryItem("Milk Bottle","","","",0)
];

//===========================
//========  SPOONS =========
//===========================
const SPOONS : Array<InventoryItem> = [
    buildInventoryItem("Spoon","","","",0)
];

export const Inventory = {
    milk: MILK,
    cereal : CEREAL,
    toppings : TOPPINGS,
    bowls : BOWLS,
    bottles : BOTTLES,
    spoons : SPOONS
}








