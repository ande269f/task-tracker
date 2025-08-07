import { UUIDTypes } from "uuid";

export interface interactiveTaskOrder {
    sortOrder: number
    uuid: UUIDTypes
}

export interface orderState {
    orderDirection: string
    orderingState: string
}