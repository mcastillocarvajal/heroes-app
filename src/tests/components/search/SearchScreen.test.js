import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('test for <SearchScreen />', () => {

    
    test('should show comp correctly with default values ', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/search' ]}>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-warning').text().trim() ).toBe('Search for a hero');
    });

    test('should show Batman and input with queryString value', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        );
        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();
    })

    test('should show an error if there is no hero found', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/search?q=batman123' ]}>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').exists() ).toBe(true);
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('should call the history.push', () => {
        
        const history = {
            push: jest.fn()
        };

        const wrapper = mount( 
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <Route 
                    path='/search' 
                    component={ () => <SearchScreen history={ history } /> }
                />
            </MemoryRouter>
        );
        
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( history.push ).toHaveBeenCalledWith('?q=batman')
    });
})
