import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
export function PageConnexionRequise() {
    const { loginWithRedirect } = useAuth0();
    return (
        <div>
            <h1>
                Connexion requise
            </h1>
            <p>Vous devez être connecté pour accéder à cette page</p>
            <button className="btn btn-link" onClick={()=>loginWithRedirect()}>Se connecter</button>
        </div>
    );
} 