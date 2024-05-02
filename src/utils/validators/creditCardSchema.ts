import * as yup from "yup";
import { luhnCheck } from "../format";

/**
* The part to add validation function using luhn algorithm to yup
*/

// Define the luhn check function
declare module "yup" {
    interface StringSchema {
      luhnCheck(errorMessage?: string): StringSchema;
    }
  }
  
  // Add luhn check function to yup
  yup.addMethod(yup.StringSchema, "luhnCheck", function (errorMessage) {
    return this.test("luhnCheck", errorMessage, function (value) {
      const { createError } = this;
      return luhnCheck(value!) || createError({ message: errorMessage });
    });
  });
  
  // validate input datas using yup
  export const creditCardSchema = yup.object().shape({
    // Card number validation
    cardNum: yup.string()
      .min(18, "Card number must be at least 15 characters")
      .luhnCheck("Invalid CardNumber formated")
      .required("CardNumber is required"),
    // Card date validation
    expiration: yup.string().trim()
      .required("Expiration is required")
      .matches(/\d{2}\/\d{2}/g, "Invalid Expiration formated"),
    // CVV validation
    cvv: yup.string().trim()
      .required("CVV required")
      .min(3, "CVV must be at least 3 characters"),
    // First name validation
    firstName: yup.string().trim().required("Frist Name is required"),
    // Last name validation
    lastName: yup.string().trim().required("Last Name is required"),
    // Zip code validation
    zipCode: yup.string().trim()
      .required("Zip Code is required")
      .matches(/(^\d{5}$)|(^\d{9}$)/g, "Zip Code must be 5 or 9 characters")
  });
  