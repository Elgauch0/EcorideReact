import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate
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
import Reservations, { loader as reservationLoader } from "./components/Reservations";
import AvisComponent, { action as avisComponentAction } from "./components/AvisComponent";
import ManagerComponent, { loader as loaderManager } from "./components/ManagerComponent";
import AdminDashboard, { action as adminActionAddEmploye } from "./components/AdminDashboard";
import AdminLayout from "./Layouts/AdminLayout";
import AdminSearchUser, { action as actionAdminSearchUser } from "./components/AdminSearchUser";
import AdminBienvenue from "./components/AdminBienvenue";
import AdminItinerariesStats, { loader as itineraryStatsLoader } from "./components/AdminItinerariesStats";
import AdminbudgetStats, { loader as budgetStatLoader } from "./components/AdminbudgetStats";
import StatsComponentLayout from "./Layouts/StatsComponentLayout";
import ContactPage, { action as formDataAction } from "./components/ContactPage";
import EmployeLayout from "./Layouts/EmployeLayout";
import EmployepublicAvis, { loader as publicAvisLoader } from "./components/EmployepublicAvis";
import PublicAvis, { action as publicActionAvis } from "./components/PublicAvis";






function App() {
  let router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<PrimeLayout />} errorElement={<ErrorElement />}>
      <Route index element={< Home />} action={actionForm} />
      <Route path="covoiturage" element={<CarpoolingForm />} action={actionForm} />
      <Route path="contact" element={< ContactPage />} action={formDataAction} />
      <Route path="publicavis" element={<PublicAvis />} action={publicActionAvis} />

      <Route path="connexion" element={<Connexion />} action={loginAction} loader={loaderConnexion} />
      <Route path="register" element={<Registration />} action={registrationAction} />
      <Route path="itineraries" element={<Itineraries />} loader={itinerariesLoader} />
      <Route path="detail" element={<DetailComponent />} loader={detailLoader} action={actionDetail} />








      <Route element={< LayoutProtection />} loader={loaderProtection} shouldRevalidate={() => false}>



        {/* User Page -------------------------------------------------------------------------------------------------------------------------- */}
        <Route path="user" element={<UserComponent />} loader={userLoader} />
        <Route path="addVehicle" element={<AddVehicle />} action={addVehicleAction} />
        <Route path="reservations" element={< Reservations />} loader={reservationLoader} />
        <Route path="avis" element={<AvisComponent />} action={avisComponentAction} />



        {/* Driver Page -------------------------------------------------------------------------------------------------------------------------- */}


        <Route path="driver" element={<DriverLayout />} loader={userLoader} >
          <Route index element={< DriverComponent />} />
          <Route path="additinerary" element={<ItineraryAddForm />} action={itineraryAction} loader={itineraryLoader} />
          <Route path="itineraires" element={<ItinerairesDriver />} loader={itinerariesDriverLoader} />

        </Route>



        {/* Manager Page -------------------------------------------------------------------------------------------------------------------------- */}


        <Route path="manager" element={<EmployeLayout />} >
          <Route index element={< AdminBienvenue />} />
          <Route path="utilisateurs" element={<ManagerComponent />} loader={loaderManager} />
          <Route path="public" element={<EmployepublicAvis />} loader={publicAvisLoader} />
        </Route>




        {/* Admin Page -------------------------------------------------------------------------------------------------------------------------- */}


        <Route path="admin" element={< AdminLayout />} >
          <Route index element={<Navigate to="stats" replace />} />
          <Route path="stats" element={< StatsComponentLayout />} >
            <Route index element={< AdminBienvenue />} />
            <Route path='itineraries' element={<AdminItinerariesStats />} loader={itineraryStatsLoader} />
            <Route path='budget' element={<AdminbudgetStats />} loader={budgetStatLoader} />
          </Route>
          <Route path="dashboard" element={<AdminDashboard />} action={adminActionAddEmploye} />
          <Route path="users" element={<AdminSearchUser />} action={actionAdminSearchUser} />
        </Route>







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
