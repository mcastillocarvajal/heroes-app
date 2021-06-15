import React from 'react';
import { mount } from 'enzyme'
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router';

describe('test for <PrivateRoute />', () => {

    const rest = {
        location: {
            pathname: '/marvel'
        }
    }
    
    Storage.prototype.setItem = jest.fn();

    test('should show component if user is auth and save localstorage', () => {
        
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute
                    isAuth={ true }
                    component={ () => <span>Ready!</span>}
                    { ...rest }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( true );
        expect( localStorage.setItem ).toHaveBeenCalledTimes(2)
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/marvel' )
    });

    test('should NOT show component if user is not auth', () => {
        
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute
                    isAuth={ false }
                    component={ () => <span>Ready!</span>}
                    { ...rest }
                />
            </MemoryRouter>
        )

        expect( wrapper.find('span').exists() ).toBe( false );
        expect( localStorage.setItem ).toHaveBeenCalledTimes(2);
    });
    
    
})
