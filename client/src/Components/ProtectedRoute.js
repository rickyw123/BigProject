import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'; // useSelector buat ambil data user yang ada di redux

const ProtectedRoute = ({isAdmin, component: Component, ...rest}) => { // buat ambil semua props yang tersisa
    const {user, isAuthenticated, loading} = useSelector(state => state.auth);
    return (
        <>
            {
                loading === false && (
                    <Route
                        {...rest}
                        render={props => {
                            if (isAuthenticated === false) {
                                return <Redirect to='/login' />
                            }
                            if (isAdmin === true && user.role !== 'admin') { // jika isAdmin true dan role bukan admin
                                return <Redirect to='/' />
                            }
                            return <Component {...props} />
                        }}
                    />
                                    )
            }
        </>
    );
}

export default ProtectedRoute;