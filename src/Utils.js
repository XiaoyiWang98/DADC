// Utility functions that can be reused globally

// Struct to store address info
function Address(addr, city, state, zip) {
    this.address = addr;
    this.city = city;
    this.state = state;
    this.zip = zip
}

// Struct to store item info, address has to be an Address object
function Item(id, status, name, description, image_link, address, lat, lng) {
    this.itemId = id;
    this.status = status;
    this.name = name;
    this.description = description;
    this.image_link = image_link;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
}

function makeAddress(addr_str) {
    const addr_splitted = addr_str.split(",");
    return new Address(
        addr_splitted[0],
        addr_splitted[1],
        addr_splitted[2].split(" ")[1],
        addr_splitted[2].split(" ")[2]
    );
}

export const parseItemList = (data) => {

    let item_list = []
    let i;
    for (i = 0; i < data.length; i++) {
        const cur = data[i]
        let item_Addr = makeAddress(cur.address);
        let item = new Item(
            cur.itemID,
            cur.status,
            cur.name,
            cur.description,
            cur.imageUrl,
            item_Addr,
            parseFloat(cur.location.split(" ")[0].split(",")[0]),
            parseFloat(cur.location.split(" ")[1])
        );
        item_list.push(item);
    }
    return item_list;
}

export const formatItemList = (json_parsed_item_list) => {
    const vom_itemList = [];
    json_parsed_item_list.forEach(item => {
        let addrObj = makeAddress(item.address);
        let itemObj = new Item(
            0,
            item.status,
            item.name,
            item.description,
            item.imageUrl,
            addrObj,
            parseFloat(item.location.lat),
            parseFloat(item.location.lon)
        );
        vom_itemList.push(itemObj);
    })
    return vom_itemList;
}