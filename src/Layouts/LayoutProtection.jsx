import { Outlet, redirect } from "react-router-dom";
import { checkAuthorization } from "../utils/functions";




export const loader = async ({ request }) => {
    const redirectTo = checkAuthorization(request);
    if (redirectTo.error) {
        throw redirect(redirectTo.message);
    }
    return null;


}

const UserLayoutProtection = () => {




    return (
        <Outlet />
    )
}

export default UserLayoutProtection;