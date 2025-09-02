import UserRegistrationForm from "../components/UserRegistrationForm"
import { Link } from "react-router-dom"


const Registration = () => {
    return (
        <div>

            <UserRegistrationForm />
            <Link
                to="/connexion"
                className="block mx-auto text-my-A hover:underline mt-4 text-center"
            >
                se connecter
            </Link>

        </div>
    )
}

export default Registration