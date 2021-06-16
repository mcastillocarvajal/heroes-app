import React from 'react';
import { mount } from 'enzyme';
import { HeroesScreen } from "../../../components/heroes/HeroesScreen"
import { MemoryRouter, Route } from 'react-router';


describe('test for <HeroesScreen/>', () => {

    const history = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()  
    }

    
    test('should show comp Redirect if there are not arguments in URL', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero']}>
                <HeroesScreen history={ history } />
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('should show a hero if param exists', () => {
        
        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroesScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true);
    });

    test('should return to previous page with PUSH', () => {

        const history = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn()  
        }

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroesScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();
    })

    test('should return to previous page with GOBACK  ', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroesScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledTimes(0);
        expect( history.goBack ).toHaveBeenCalled();
    })

    test('should call the Redirect if hero does not exists', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/marvel-spider11554154']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroesScreen history={ history } /> } 
                />
            </MemoryRouter>
        );
        
        expect( wrapper.text() ).toBe('');
    })
})
