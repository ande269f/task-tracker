import { toaster } from "../components/ui/toaster"



export const createToasterOnErrorResponse = (response: any, toasterContext: string) => {
    if (!response || response == null) return
    if (response == "ERROR") {
        toaster.create({
        description: toasterContext,
        type: "error"
        })
    }
}


export const createToasterOnSuccessResponse = (response: any, toasterContext: string) => {
    if (!response || response == null) return
    if (response == "SUCCESS") {
        toaster.create({
        description: toasterContext,
        type: "success"
        })
    }
}