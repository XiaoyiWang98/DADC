export const DONATED_ITEMS = [
    {
        itemId: 0,
        status: "pending",
        post_date: "2020-08-15",
        lat: 0,
        lng: 0,
        name: "Item1",
        address: {
            address: "1 Infinite Loop",
            city: "Cupertino",
            state: "CA",
            zip: 95014
        },
        description: "item1 description",
        image_link: "https://www.nindelivers.com/wp-content/uploads/2019/05/parcel-package.jpeg"
    },

    {
        itemId: 1,
        status: "completed",
        post_date: "2020-08-01",
        lat: 0,
        lng: 0,
        name: "Item2",
        address: {
            address: "1 Infinite Loop",
            city: "Cupertino",
            state: "CA",
            zip: 95014
        },
        description: "item2 description",
        image_link: "https://www.nindelivers.com/wp-content/uploads/2019/05/parcel-package.jpeg"
    }
];

export const NGO_SCHEDULES = [
    {
        scheduleId: 0,
        scheduleDate: "2020-08-15",
        status: "pending",
        itemList: DONATED_ITEMS
    },
    {
        scheduleId: 1,
        scheduleDate: "2020-08-10",
        status: "completed",
        itemList: DONATED_ITEMS
    }
];

export const NGO_PROCESSED_SCHEDULES = [
    {
        scheduleId: 0,
        scheduleDate: "2020-08-15",
        status: "pending",
        totalLocations: 1,
        itemList: DONATED_ITEMS
    },
    {
        scheduleId: 1,
        scheduleDate: "2020-08-10",
        status: "completed",
        totalLocations: 1,
        itemList: DONATED_ITEMS
    }
]
