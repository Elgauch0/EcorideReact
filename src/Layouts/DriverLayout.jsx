import { Outlet, useLoaderData, NavLink } from "react-router"

const DriverLayout = () => {
    const userData = useLoaderData();
    const activelink = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616'
    };
    return (
        <>

            <NavLink
                to="."
                end
                style={({ isActive }) => isActive ? activelink : null}
                className='font-normal no-underline text-my-C mx-2'
            >Mes Infos</NavLink>
            <NavLink
                to="itineraires"
                style={({ isActive }) => isActive ? activelink : null}
                className='font-normal no-underline text-my-C mx-2'
            >Mes Itineraires</NavLink>
            {/* <NavLink
                to="additinerary"
                style={({ isActive }) => isActive ? activelink : null}
                className='font-normal no-underline text-my-C mx-2'
            >Publiez un itineraire</NavLink> */}


            <Outlet context={userData} />
        </>

    )
}

export default DriverLayout