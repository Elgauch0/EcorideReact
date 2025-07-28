import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router";
import PrimeLayout from "./pages/PrimeLayout";
import Home from "./pages/Home";
import { action as actionForm } from "./components/CarpoolingForm";
import ErrorElement from "./components/ErrorElement";
import Notfound from "./components/Notfound";
import Itineraries, { loader as itinerariesLoader } from "./pages/Itineraries";



function App() {
  let router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<PrimeLayout />} errorElement={<ErrorElement />}>
      <Route index element={< Home />} action={actionForm} />
      <Route path="itineraries" element={<Itineraries />} loader={itinerariesLoader} />
      <Route path="covoiturage" element={<h1>covoiturage page</h1>} />
      <Route path="contact" element={<h1>contact page</h1>} />
      <Route path="connexion" element={<h1>connexion page</h1>} />
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
