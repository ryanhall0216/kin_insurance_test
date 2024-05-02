import React from "react"

export type Props = {
    label: React.ReactNode,
    mask?: any,
    placeholder: string,
    name: string
}

export type FormValues = {
    cardNum: string,
    expiration: string,
    cvv: string,
    firstName: string,
    lastName: string,
    zipCode: string,
}