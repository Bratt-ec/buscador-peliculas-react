import React, {Fragment} from 'react';
import 'bootswatch/dist/darkly/bootstrap.min.css';

const Header = () => {
    return ( 
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#"><h3>Buscar Películas - MovieDB </h3></a>
            </nav>
        </Fragment>
     );
}
 
export default Header;
