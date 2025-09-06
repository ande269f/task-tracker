import { UUIDTypes } from "uuid";

export interface LoginState {
    LoggedIn: boolean
    sessionId: UUIDTypes | null
    userId: number | null
}