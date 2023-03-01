import {atom, selector} from "recoil";

export const currentimage = atom({
    key:"current-image",
    default: {
        path: "0.png",
        id: 0,
    }
})