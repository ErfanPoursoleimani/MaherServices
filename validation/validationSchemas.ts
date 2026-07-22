import { z } from 'zod'
import { ERROR_MESSAGES } from './validationErrors';

const { PHONE_NUMBER, POSTAL_CODE, FIRST_NAME, LAST_NAME, URL, REQUIRED } = ERROR_MESSAGES

export const userLoginSchema = z.object({
    phoneNumber: z.string()
    .min(1, REQUIRED)
    .refine((value) => {
      const phonePatterns = [
        // Iran (+98)
        /^\+98\d{10}$/, // International format: +98xxxxxxxxxx
        /^0\d{10}$/, // National format: 0xxxxxxxxxx (11 digits total)
        /^09\d{9}$/, // Mobile format: 09xxxxxxxxx
        /^\+98\s?9\d{2}\s?\d{3}\s?\d{4}$/, // +98 9xx xxx xxxx
        /^0\d{2,3}\s?\d{3,4}\s?\d{4}$/, // Landline with spaces
      ]
      
      // Test original value
      if (phonePatterns.some(pattern => pattern.test(value))) {
        return true;
      }
      
      // Test cleaned value (digits only)
      const cleanPhone = value.replace(/\D/g, '');
      if (cleanPhone.length >= 10 && cleanPhone.length <= 15) {
        return phonePatterns.some(pattern => pattern.test(cleanPhone));
      }
      
      return false;
    }, {
      message: PHONE_NUMBER
    })
})

export const userSchema = z.object({
    firstName: z.string().min(3, FIRST_NAME).nullable().transform((value) => value || null),
    lastName: z.string().min(3, LAST_NAME).nullable().transform((value) => value || null),
})

export const cartSchema = z.object({
})

export const cartProductSchema = z.object({
})

export const orderSchema = z.object({
})

export const productSchema = z.object({
    label: z.string().min(1, REQUIRED).max(255),
    originalPriceFa: z.number().min(1, REQUIRED),
    priceFa: z.number().min(1, REQUIRED),
    stock: z.number().min(1, REQUIRED),
    url: z.string().min(1, REQUIRED),
    description: z.string().min(1, REQUIRED)
})

export const tagSchema = z.object({
  label: z.string().min(1, REQUIRED),
  url: z.string().min(1, REQUIRED)
})

export const underTagSchema = z.object({
  label: z.string().min(1, REQUIRED),
  url: z.string().min(1, REQUIRED)
})