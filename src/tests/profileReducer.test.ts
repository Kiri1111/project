import {profile, setNewNameAC} from "../bll/reducers/profile";
import {ResponseType} from "../dal/api/CardsApi";

const startState: ResponseType = {
    _id: '1',
    rememberMe: true,
    isAdmin: false,
    verified: false,
    name: 'Alex',
    avatar: null,
    email: 'kkkkkkkkkkk',
    publicCardPacksCount: 0,
    __v: 1,
    token: 'lll',
    tokenDeathTime: 11,

}

test('Update user name', () => {

        const action = setNewNameAC('Bob')
        const endState = profile(startState, action)

        expect(endState.name).toBe(endState.name === 'Bob')
    }
)