import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router";
import PrimeLayout from "./Layouts/PrimeLayout";
import Home from "./pages/HomePage";
import { action as actionForm } from "./components/CarpoolingForm";
import ErrorElement from "./components/ErrorElement";
import Notfound from "./components/Notfound";
import Itineraries, { loader as itinerariesLoader } from "./pages/ItinerariesPage";
import Connexion, { action as loginAction, loader as loaderConnexion } from "./pages/ConnexionPage";
import Registration from "./pages/RegistrationPage";
import { action as registrationAction } from './components/UserRegistrationForm'
import LayoutProtection, { loader as loaderProtection } from "./Layouts/LayoutProtection";
import UserComponent, { loader as userLoader } from "./components/UserComponent";
import CarpoolingForm from "./components/CarpoolingForm";
import DetailComponent, { action as actionDetail, loader as detailLoader } from "./components/DetailComponent";
import DriverComponent from "./components/DriverComponent";
import DriverLayout from "./Layouts/DriverLayout";
import ItineraryAddForm, { action as itineraryAction, loader as itineraryLoader } from "./components/ItineraryAddForm";
import AddVehicle, { action as addVehicleAction } from "./components/AddVehicle";
import ItinerairesDriver, { loader as itinerariesDriverLoader } from "./components/Itineraires";




function App() {
  let router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<PrimeLayout />} errorElement={<ErrorElement />}>
      <Route index element={< Home />} action={actionForm} />
      <Route path="covoiturage" element={<CarpoolingForm />} action={actionForm} />
      <Route path="contact" element={<h1>contact page</h1>} />

      <Route path="connexion" element={<Connexion />} action={loginAction} loader={loaderConnexion} />
      <Route path="register" element={<Registration />} action={registrationAction} />
      <Route path="itineraries" element={<Itineraries />} loader={itinerariesLoader} />
      <Route path="detail" element={<DetailComponent />} loader={detailLoader} action={actionDetail} />






      <Route element={< LayoutProtection />} loader={loaderProtection} shouldRevalidate={() => false}>


        {/* User Page -------------------------------------------------------------------------------------------------------------------------- */}
        <Route path="user" element={<UserComponent />} loader={userLoader} />
        <Route path="addVehicle" element={<AddVehicle />} action={addVehicleAction} />




        {/* Driver Page -------------------------------------------------------------------------------------------------------------------------- */}


        <Route path="driver" element={<DriverLayout />} loader={userLoader} >
          <Route index element={< DriverComponent />} />
          <Route path="additinerary" element={<ItineraryAddForm />} action={itineraryAction} loader={itineraryLoader} />
          <Route path="itineraires" element={<ItinerairesDriver />} loader={itinerariesDriverLoader} />

        </Route>



        {/* Manager Page -------------------------------------------------------------------------------------------------------------------------- */}



        <Route path="manager" element={<h1>Manager Page</h1>} />




        {/* Admin Page -------------------------------------------------------------------------------------------------------------------------- */}



        <Route path="admin" element={<h1>Admin Page</h1>} />







      </Route>



      <Route path="*" element={<Notfound />} />

    </Route >


  ),
    {
      // Add the hydrateFallbackElement here
      hydrateFallbackElement: <h1>Loading...</h1>,
    }
  )


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
