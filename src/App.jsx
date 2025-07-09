import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router";
import PrimeLayout from "./pages/PrimeLayout";
import Home from "./pages/Home";



function App() {
  let router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<PrimeLayout />} >
      <Route index element={< Home />} />
      <Route path="covoiturage" element={<h1>covoiturage page</h1>} />
      <Route path="contact" element={<h1>contact page</h1>} />
      <Route path="connexion" element={<h1>connexion page</h1>} />

    </Route>


  ))


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
