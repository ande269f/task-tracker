"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ReactNode } from "react"
//før var det her colorModeProvider var defineret - fjernet da det giver utiltænkte kontrastery
export function Provider({children}: {children: ReactNode}) {
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
    </ChakraProvider>
  )
}
