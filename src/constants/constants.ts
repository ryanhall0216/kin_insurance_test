import { IconLabel } from "../components/common/LabelIcon";

export const API_URL = "https://jsonplaceholder.typicode.com";

export const DEFAULT_CARD_DATA = [
    {
        name: "cardNum",
        label: IconLabel("Credit Card Number",true),
        mask: [
            /\d/, /\d/, /\d/, /\d/, " ",
            /\d/, /\d/, /\d/, /\d/, " ",
            /\d/, /\d/, /\d/, /\d/, " ",
            /\d/, /\d/, /\d/, /\d/,],
        placeholder: "XXXX XXXX XXXX XXXX",
        size: 6,
    },
    {
        name: "expiration",
        label: IconLabel("Expiration Data"),
        mask: [/\d/, /\d/, '/', /\d/, /\d/,],
        placeholder: "XX/XX",
        size: 4,
    },
    {
        name: "cvv",
        label: IconLabel("CVV",true),
        mask: [/\d/, /\d/, /\d/, /\d/],
        placeholder: "XXX",
        size: 2
    },
    {
        name: "firstName",
        label: IconLabel("Cardholder's First Name"),
        mask: [
            /\D/, /\D/, /\D/, /\D/,
            /\D/, /\D/, /\D/, /\D/,
            /\D/, /\D/, /\D/, /\D/,
            /\D/, /\D/, /\D/, /\D/,
            /\D/, /\D/, /\D/, /\D/,],
        placeholder: "First name",
        size: 5
    },
    {
        name: "lastName",
        label: IconLabel("Cardholder's Last Name"),
        mask: [
            /\D/, /\D/, /\D/, /\D/,
            /\D/, /\D/, /\D/, /\D/,
            /\D/, /\D/, /\D/, /\D/,
            /\D/, /\D/, /\D/, /\D/,
            /\D/, /\D/, /\D/, /\D/,],
        placeholder: "Last Name",
        size: 5
    },
    {
        name: "zipCode",
        label: IconLabel("Billing Zip Code"),
        mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        placeholder: "XXXXXX",
        size: 2
    },
]