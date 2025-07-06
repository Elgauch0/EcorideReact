import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router";



function App() {
  let router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home />} />

  ))


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
