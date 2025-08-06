import { Outlet, redirect } from "react-router-dom";
import { checkAuthorization } from "../utils/functions";




export const loader = async ({ request }) => {
    const redirectTo = checkAuthorization(request);
    if (redirectTo) {
        throw redirect(redirectTo);
    }
    return null;


}

const UserLayoutProtection = () => {




    return (
        <Outlet />
    )
}

export default UserLayoutProtection;