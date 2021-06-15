import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { Navbar } from '../../components/ui/Navbar';
import { MemoryRouter, Router } from 'react-router';
import { types } from '../../types/types';

describe('test for <Navbar/>', () => {

    const historyMock = {
        location: {},
        replace: jest.fn(),
        push: jest.fn(),
        listen: jest.fn(),
        createHref: jest.fn()
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Moises'
        }
    }
    
    const wrapper = mount( 
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should show component correctly', () => {
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe( 'Moises' );
    });

    test('should call the logout and history.replace', () => {
        
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });
        expect( historyMock.replace ).toHaveBeenCalledWith('/login');
    })
    
    
})
