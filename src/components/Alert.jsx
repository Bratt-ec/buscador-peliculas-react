import React,{Fragment} from 'react';

const Alert = () => {
    return ( 
        <Fragment >
            <div id="div-alerta">
                <div className="alert alert-dismissible alert-danger mt-5">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <strong>Error!</strong> Ingrese un término de búsqueda
                </div>
            </div>
        </Fragment>
     );
}
 
export default Alert;