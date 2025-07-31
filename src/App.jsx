import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router";
import PrimeLayout from "./pages/PrimeLayout";
import Home from "./pages/HomePage";
import { action as actionForm } from "./components/CarpoolingForm";
import ErrorElement from "./components/ErrorElement";
import Notfound from "./components/Notfound";
import Itineraries, { loader as itinerariesLoader } from "./pages/ItinerariesPage";
import Connexion, { action as loginAction } from "./pages/ConnexionPage";
import Registration from "./pages/RegistrationPage";
import { action as registrationAction } from './components/UserRegistrationForm'



function App() {
  let router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<PrimeLayout />} errorElement={<ErrorElement />}>
      <Route index element={< Home />} action={actionForm} />
      <Route path="covoiturage" element={<h1>covoiturage page</h1>} />
      <Route path="contact" element={<h1>contact page</h1>} />

      <Route path="connexion" element={<Connexion />} action={loginAction} />
      <Route path="register" element={<Registration />} action={registrationAction} />


      <Route path="itineraries" element={<Itineraries />} loader={itinerariesLoader} />

      <Route path="*" element={<Notfound />} />

    </Route>


  ), {
    hydrateFallbackElement: <div>Chargement...</div>
  })


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
