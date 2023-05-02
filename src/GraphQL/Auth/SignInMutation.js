import { gql } from '@apollo/client'

const SIGNIN = gql`
    mutation SignIn(
        $userName: String
        $password: String
        $signingInFromConsumerOrAdmin: SigningInFromConsumerOrAdmin
    ) {
        signIn(
            userName: $userName
            password: $password
            signingInFromConsumerOrAdmin: $signingInFromConsumerOrAdmin
        ) {
            token
            tokenTime
            userName
            userType
            refreshToken
        }
    }
`
type ISignInResponse = {
    signIn: {
        token: string
        tokenTime: string
        userName: string
        userType: string
        refreshToken: string
        userId: string
    }
}

export type { ISignInResponse }
export { SIGNIN }