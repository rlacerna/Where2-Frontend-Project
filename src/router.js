import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,


} from "react-router-dom"

import App from "./App"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Reviews from "./pages/Reviews"
import SingleReview from "./pages/SingleReview"
import Auth from "./pages/Auth"

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}>
      <Route path="" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/reviews" element={
      <Auth><Reviews/></Auth>} />
      <Route path="/reviews/:id" element={<Auth><SingleReview/></Auth>} />
  </Route>
  )
)

export default router