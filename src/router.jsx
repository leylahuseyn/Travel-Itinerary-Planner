import MainRoot from "./pages/client/MainRoot";
import Home from "./pages/client/Home/Home";
import Flights from "./pages/client/Flights/Flights";
import CarRentals from "./pages/client/CarRentals/CarRentals";
import SignIn from "./pages/client/SignIn/SignIn";
import SignUp from "./pages/client/SignUp/SignUp";
import { createBrowserRouter } from "react-router-dom";
import TourPackage from "./pages/client/TourPackage/TourPackage";
import Detail from "./pages/client/Detail/Detail";
import TourReservations from "./pages/admin/TourReservation/TourReservation";
import ReservationDetail from "./pages/admin/TourReservation/ReservationDetail ";
import Wishlist from "./pages/client/Wishlist/Wishlist";
import CarReservation from "./pages/admin/CarReservation/CarReservation";
import Logout from "./pages/client/Logout/Logout";
import Map from "./pages/client/Map/map";
import FlightsReserv from "./pages/admin/FlightsReserv/flightsReserv";
import CountryDetail from "./pages/client/CountryDetail/CountryDetail";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainRoot />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/Flights",
        element: <Flights />
      },
      {
        path: "/CarRentals",
        element: <CarRentals />,
      },
      {
        path: "/TourPackage",
        element: <TourPackage />,
      },
      {
        path: "/Detail/:cityId/:hotelId",
        element: <Detail />
      },
      {
        path: "/Wishlist",
        element: <Wishlist />
      },
      {
        path: "/Logout",
        element: <Logout/>
      },
      {
        path: "/Map",
        element: <Map/>
      },
      {
        path: "/Country/:id",
        element: <CountryDetail/>
      },
      {
        path: '/admin',
        children: [
          {
            path: "/admin/TourReservation",
            element: (
              <ProtectedRoute>
                <TourReservations />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/flightsReserv",
            element: (
              <ProtectedRoute>
                <FlightsReserv />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/TourReservation/:id",
            element: (
              <ProtectedRoute>
                <ReservationDetail />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/CarReservation",
            element: (
              <ProtectedRoute>
                <CarReservation />
              </ProtectedRoute>
            ),
          },
        ]
      }
    ]
  },
  {
    path: '/',
    children: [
      {
        path: "/SignIn",
        element: <SignIn />
      },
      {
        path: "/SignUp",
        element: <SignUp/>
      }
    ]
  },
])
