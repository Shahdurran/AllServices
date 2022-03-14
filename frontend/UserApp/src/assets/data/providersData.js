
import {images} from '../../constants'

const affordable = 1
const fairPrice = 2
const expensive = 3

export const CurrentLocation = {
    streetName: "Kuching",
    gps: {
        latitude: 24.81943583196653, 
        longitude: 67.06319363820258,
    }
}

export const providerData = [
    {
        id: 1,
        name: "Rabia's Beauty Parlor",
        rating: 4.8,
        categories: [5, 7],
        priceRating: affordable,
        // photo: images.burger_restaurant_1,
        duration: "30 - 45 min",
        location: {
            latitude: 24.81943583196653, 
            longitude: 67.06319363820258,
        },
        courier: {
            avatar: images.avatar_1,
            name: "Ayesha"
        },
    },
    {
        id: 2,
        name: "Shehzad Autos",
        rating: 4.8,
        categories: [2, 4, 6],
        priceRating: expensive,
        // photo: images.pizza_restaurant,
        duration: "15 - 20 min",
        location: {
            latitude: 24.824285195527835,
            longitude:  67.05765755900563,
        },
        courier: {
            avatar: images.avatar_2,
            name: "Rizwan"
        },
    },
    {
        id: 3,
        name: "Computips",
        rating: 4.8,
        categories: [3],
        priceRating: expensive,
        // photo: images.hot_dog_restaurant,
        duration: "20 - 25 min",
        location: {
            latitude: 24.822259781624936,
            longitude:  67.06345113025824
        },
        courier: {
            avatar: images.avatar_3,
            name: "Akram"
        },
    },
    {
        id: 4,
        name: "Ac Repair",
        rating: 4.8,
        categories: [8],
        priceRating: expensive,
        // photo: images.japanese_restaurant,
        duration: "10 - 15 min",
        location: {
            latitude: 24.82233861764778, 
                longitude: 67.06333414310286,
        },
        courier: {
            avatar: images.avatar_4,
            name: "Ahmad"
        },
    },
    {
        id: 5,
        name: "Ideal Tailor",
        rating: 4.8,
        categories: [1, 2],
        priceRating: affordable,
        // photo: images.noodle_shop,
        duration: "15 - 20 min",
        location: {
            latitude: 24.814869622354987, 
            longitude: 67.07065120917066,
        },
        courier: {
            avatar: images.avatar_4,
            name: "Karim"
        },
    },
    {

        id: 6,
        name: "Ruth Parlor",
        rating: 4.9,
        categories: [9, 10],
        priceRating: affordable,
        // photo: images.kek_lapis_shop,
        duration: "35 - 40 min",
        location: {
            latitude: 24.814869622354987, 
            longitude: 67.07231417869687,
        },
        courier: {
            avatar: images.avatar_1,
            name: "Rabia"
        },
    }


]
