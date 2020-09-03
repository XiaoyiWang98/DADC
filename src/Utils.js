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

export const parseData = (data) => {
    let i;
    let item_list = []
    for (i = 0; i < data.length; i++) {
        const cur = data[i], addr_splitted = cur.address.split(",");
        let item_Addr = new Address(
            addr_splitted[0],
            addr_splitted[1],
            addr_splitted[2].split(" ")[1],
            addr_splitted[2].split(" ")[2]
        )
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