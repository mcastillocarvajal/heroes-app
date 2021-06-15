import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('Test for authReducer ', () => {
    
    test('should return default state ', () => {
        
        const state = authReducer({ logged: false }, {} );
        expect( state ).toEqual({ logged: false });
    })
    
    test('should auth and show username ', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Moises'
            }
        }

        const state = authReducer({ logged: false }, action );
        expect( state ).toEqual({ 
            logged: true,
            name: 'Moises' 
        });
    })

    test('should delete username and logged = false ', () => {

        const action = {
            type: types.logout
        }

        const state = authReducer({ logged: true, name: 'Moises' }, action );
        expect( state ).toEqual({ logged: false });
    })
    
})
