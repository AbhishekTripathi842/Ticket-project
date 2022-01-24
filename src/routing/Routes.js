import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"; 
import { toast } from "react-toastify";

// --------------------- Public Routes --------------------- //
import HomePage from '../components/Home-Component/HomePage';
import LoginPage from '../components/Login-Component/Login';
import SignUpPage from '../components/Signup-Component/SignUp';
import EventsPage from '../components/Event-Component/EventsMain';
import ContactPage from '../components/ContactUs-Component/ContactMain';
import NewsPage from '../components/News-Component/NewsMain';
import NewsSingleComponent from '../components/News-Component/NewsSingle';
import AboutPage from '../components/AboutUs-Component/AboutMain';
import HelpSupportPage from '../components/Support-Component/HelpSupport';
import FaqPage from '../components/Faq-Component/Faq';
import ListEventsPage from '../components/ListEvents-Component/ListEvents';
import EventSeatsTicketsPage from '../components/EventSeatTickets-Component/EventSeatTickets';
import SearchResults from '../components/Search-Component/searchResults';
// --------------------- Public Routes --------------------- //

// --------------------- Private Routes -------------------- //
import CheckoutPage from '../components/Checkout-Component/Checkout';
// import MyBookedTickets from '../components/UserBookedTickets-Component/UserBookedTickets';
import PurchasedTickets from '../components/UserPurchasedTickets-Component/PurchasedTickets';
import SaleTickets from '../components/UserTicketsForSale-Component/TicketsForSale';
import SellTickets from '../components/SellTickets-Component/SellTickets';
// --------------------- Private Routes -------------------- //

// --- Error Page --- //
import NotFound from '../components/Error-Component/404';
import ErrorCode500 from '../components/Error-Component/500'


toast.configure()
const ROUTES = [
    {path: '/' , key:'ROOT', exact:true, component:HomePage},
    
    {path: '/sign-in' , key:'SIGNIN', exact:true, component:LoginPage},
    {path: '/sign-up' , key:'SIGNUP', exact:true, component:SignUpPage},
    {path: '/events' , key:'EVENTS', exact:true, component:EventsPage},
    {path: '/event/:toxonomy', key:'LIST_EVENTS', component:ListEventsPage},
    {path: '/contact' , key:'CONTACT', exact:true, component:ContactPage},
    {path: '/news' , key:'NEWS', exact:true, component:NewsPage},
    {path: '/news/:newsTitle/:newsId' , key:'NEWS_SINGLE', exact:true, component:NewsSingleComponent},
    {path: '/about' , key:'ABOUT', exact:true, component:AboutPage},
    {path: '/help&support' , key:'HELP', exact:true, component:HelpSupportPage},
    {path: '/faq' , key:'FAQ', exact:true, component:FaqPage},
    {path: '/search', key: "SEARCH", search:'?q', exact: true, component:SearchResults},
    {path: '/:eventName/:eventLocation/:eventCategory/:id' , key:'EVENT_TICKETS_LIST', exact:true, component:EventSeatsTicketsPage},

    // ---------- Error Routes ----------- //
    {path: '/500', key: "ERROR_500", exact: true, component:ErrorCode500},
    // ---------- Error Routes ----------- //

    // --------------- protected routes --------------- //
    {path: '/checkout', key: "CHECKOUT", search:'?auth', exact: true, component:CheckoutPage}, // authenticated checked on component did mount to sign in and ticket delievery
    // {path: '/tickets/:userId', key: "MY_TICKETS", exact: true, component:MyBookedTickets},
    {path: '/sell', key: "SELL_TICKETS", exact: true, component:SellTickets},
    {path: '/purchased-tickets', key: "PURCHASED", exact: true, component:PurchasedTickets},
    {path: '/tickets-for-sale', key: "SALE_TICKETS", exact: true, component:SaleTickets},
    // --------------- protected routes --------------- //
  ];
export default ROUTES;

function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
}


export function RenderRoutes({ routes }) {
    return (
      <Switch>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes key={route.key} {...route} />;
        })}
        <Route render={props => <NotFound />} />
      </Switch>
    );
}