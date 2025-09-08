import { UUIDTypes } from "uuid";

export interface LoginState {
    username: string
    loggedIn: boolean
    sessionId: UUIDTypes | null
    userId: number | null
}