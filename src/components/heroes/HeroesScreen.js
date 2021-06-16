import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroesById } from '../../selectors/getHeroesById';
import { heroImages } from '../../helpers/heroImages';

export const HeroesScreen = ({ history }) => {

    const { heroeId } = useParams();

    const hero = useMemo(() => getHeroesById( heroeId ), [ heroeId ])

    if ( !hero ) {
        return <Redirect to="/"/>
    }

    const handleReturn = () => {

        if ( history.length <= 2 ) {
            history.push('/');
        } else {
            history.goBack();
        }
    }
    const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    // src={ `../assets/heroes/${ heroeId }.jpg` } // from public/assets
                    // src={ batman } // single import
                    src={ heroImages(`./${ heroeId }.jpg`).default }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                    alt={ superhero }/>
            </div>

            <div className="col-8 animate__animated animate__fadeInDown">
                <h2 className="mb-3">{ superhero }</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b> Alter ego: </b>{ alter_ego }</li>
                    <li className="list-group-item"><b> Publisher: </b>{ publisher }</li>
                    <li className="list-group-item"><b> First appearance: </b>{ first_appearance }</li>
                </ul>

                <h5>Characters</h5>
                <p>{ characters }</p>

                <button 
                    className="btn btn-dark"
                    onClick={ handleReturn }>
                    Return
                </button>
            </div>
        </div>
    )
}
