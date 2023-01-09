import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Addproduct from './pages/Addproduct.jsx';
import Categorylist from './pages/Categorylist.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Kot from './pages/Kot.jsx';
import Login from './pages/Login.jsx';
import Pagenotfound from './pages/Pagenotfound.jsx';
import Pos from './pages/Pos.jsx';
import Productlist from './pages/Productlist.jsx';
import Orderlist from './pages/Orderlist.jsx';
import Orderdetails from './pages/Orderdetails.jsx';
import ViewTableOrder from './pages/ViewTableOrder.jsx';
import { AuthContext } from './AuthContextProvider';
import { RequireAuth } from './RequireAuth';
import Productdetails from './pages/Productdetails.jsx';
import Editproduct from './pages/Editproduct.jsx';
import Editprofile from './pages/Editprofile.jsx';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DineinList from './pages/DineinList.jsx';
import Inventorycategory from './pages/Inventorycategory.jsx';
import Inventoryproducts from './pages/Inventoryproducts.jsx';
import Releaseinventory from './pages/Releaseinventory.jsx';
import Customers from './pages/Customers.jsx';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import OneSignal from 'react-onesignal';
import Pickuppoint from './pages/Pickuppoint.jsx';
import Subscription from './pages/Subscription.jsx';
import Salesreport from './pages/Salesreport.jsx';
import Orderreport from './pages/Orderreport.jsx';
import Productreport from './pages/Productreport.jsx';
import Print from './pages/Print.jsx';
import StockPurchase from './pages/StockPurchase.jsx';
import ReleaseStock from './pages/ReleaseStock.jsx';
import AddStockPurchase from './pages/AddStockPurchase.jsx';
import EditStockPurchase from './pages/EditStockRelease.jsx';
import { Howl } from 'howler';
import { toast } from 'react-toastify';
import Kitchens from './pages/Kitchens.jsx';
import Semifinishedrawmaterialproducts from './pages/Semifinishedrawmaterialproducts.jsx';
import Addsemifinishedrawmaterialproducts from './pages/Addsemifinishedrawmaterialproducts.jsx';
import Editsemifinishedrawmaterialproducts from './pages/Editsemifinishedrawmaterialproducts.jsx';
import Supliers from './pages/Supliers.jsx';
import Semifinishedrawmaterialproductsdetails from './pages/Semifinishedrawmaterialproductsdetails.jsx';
import KitchenProducts from './pages/KitchenProducts.jsx';
import DataTable from './pages/DataTable.jsx';
import UpdateProductRecipe from './pages/UpdateProductRecipe.jsx';
import ProductRecipe from './pages/ProductRecipe.jsx';
import ComingSoon from './pages/ComingSoon.jsx';
import CustomerInsights from './pages/CustomerInsights.jsx';
import CrmCampaigns from './pages/CrmCampaigns.jsx';
import loader from './assets/loader.png';
import CrmCampaignsCreate from './pages/CrmCampaignsCreate.jsx';
import ProductAddons from './pages/ProductAddons.jsx';
import Offers from './pages/Offers.jsx';
import CreateCoupon from './pages/CreateCoupon.jsx';
import EditCoupons from './pages/EditCoupons.jsx';
import Orderinvoices from './pages/Orderinvoices.jsx';
import Staffaccounts from './pages/Staffaccounts.jsx';
import Customerfeedback from './pages/Customerfeedback.jsx';
import PerUserOrder from './pages/PerUserOrder.jsx';
import Newtableorder from './pages/Newtableorder.jsx';
import Invoicedashboard from './pages/Invoicedashboard.jsx';

OneSignal.init({ appId: '49e49fa7-d31e-42d9-b1d5-536c4d3758cc' });

//for Release point
// global.api = 'https://dine-api.weazy.in/api/';

//for Testing point
// global.api = ' https://beta-dine-api.weazy.in/api/';

//for local
global.api = 'http://3.108.209.160/weazy-dine-api/public/api/';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      is_login: true,
      loading: true,
      user: [],
      play: false,
      login_data: [],
    };
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('@auth_login'));
    if (items != null) {
      this.get_profile(items.token);
      global.vendor = items.vendor_id;
      global.step = this.state.step;
      // global.msg = "Welcome Back";
    } else {
      this.logout();
    }
    this.getOS();
  }

  getOS = () => {
    var userAgent = window.navigator.userAgent,
      platform =
        window.navigator?.userAgentData?.platform || window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'macOS'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    }
    global.os = os;
  };

  login = (step, user, role, token) => {
    this.setState({
      is_login: true,
      step: step,
      user: user,
      token: token,
      loading: false,
      login_data: role,
    });

    OneSignal.sendTag('id', '' + user.id);
    OneSignal.sendTag('account_type', 'vendor-bmguj1sfd77232927ns');

    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: '714d1999a24b68c8bf87', // for production
      // key: 'b8ba8023ac2fc3612e90', //for testing
      cluster: 'ap2',
      forceTLS: true,
      disableStats: true,
      authEndpoint: global.api + 'broadcasting/auth',
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: token,
        },
      },
    });

    window.Echo.private(`NotificationChannel.` + user.id).listen(
      '.notification.created',
      (e) => {
        toast.success(e.orders.msg.title, {
          position: 'top-right',
          toastId: 'success1',
        });
        var sound = new Howl({
          src: ['notification.mp3'],
          html5: true,
        });
        sound.play();
        // this.setState({ data: e.tables });
      }
    );
  };

  get_profile = (token) => {
    fetch(global.api + 'get_vendor_profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Unauthenticated.') {
          this.logout();
        }
        if (!json.status) {
        } else {
          this.login(json.step, json.data[0], json.user, token);
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
    // this.setState({ is_login: true, step: step, token: token });
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      is_login: false,
      loading: false,
      token: '',
      user: [],
      login_data: [],
    });
  };

  render() {
    return this.state.loading ? (
      <div className="preloader">
        <img src={loader} alt="" className="image_loader" />
      </div>
    ) : (
      <>
        <AuthContext.Provider
          value={{
            login: this.login,
            logout: this.logout,
            is_login: this.state.is_login,
            token: this.state.token,
            user: this.state.user,
            role: this.state.login_data,
            get_vendor_profile: this.get_profile,
          }}
        >
          <Routes>
            <Route
              exact
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/invoicedashboard"
              element={
                <RequireAuth>
                  <Invoicedashboard />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/pos"
              element={
                <RequireAuth>
                  <Pos />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/pos/:table_id"
              element={
                <RequireAuth>
                  <Pos />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/kot"
              element={
                <RequireAuth>
                  <Kot />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/productlist"
              element={
                <RequireAuth>
                  <Productlist />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/categorylist"
              element={
                <RequireAuth>
                  <Categorylist />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/addproduct"
              element={
                <RequireAuth>
                  <Addproduct />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/orderlist"
              element={
                <RequireAuth>
                  <Orderlist />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/orderdetails/:id"
              element={
                <RequireAuth>
                  <Orderdetails />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/viewtableorder/:id"
              element={
                <RequireAuth>
                  <ViewTableOrder />
                </RequireAuth>
              }
            />{' '}
            <Route
              exact
              path="/productdetails/:id"
              element={
                <RequireAuth>
                  <Productdetails />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/editproduct/:id"
              element={
                <RequireAuth>
                  <Editproduct />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/editprofile"
              element={
                <RequireAuth>
                  <Editprofile />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/dineinlisting"
              element={
                <RequireAuth>
                  <DineinList />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/inventorycategory"
              element={
                <RequireAuth>
                  <Inventorycategory />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/inventoryproducts"
              element={
                <RequireAuth>
                  <Inventoryproducts />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/releaseinventory"
              element={
                <RequireAuth>
                  <Releaseinventory />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/pickuppoint"
              element={
                <RequireAuth>
                  <Pickuppoint />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/subscription"
              element={
                <RequireAuth>
                  <Subscription />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/salesreport"
              element={
                <RequireAuth>
                  <Salesreport />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/orderreport"
              element={
                <RequireAuth>
                  <Orderreport />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/productreport"
              element={
                <RequireAuth>
                  <Productreport />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/customers"
              element={
                <RequireAuth>
                  <Customers />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/print/:code/1.pdf"
              element={
                <RequireAuth>
                  <Print />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/stock_purchase"
              element={
                <RequireAuth>
                  <StockPurchase />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/ReleaseStock"
              element={
                <RequireAuth>
                  <ReleaseStock />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/add_stock_purchase"
              element={
                <RequireAuth>
                  <AddStockPurchase />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/edit_stock_purchase/:id"
              element={
                <RequireAuth>
                  <EditStockPurchase />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/kitchens"
              element={
                <RequireAuth>
                  <Kitchens />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/semifinishedrawmaterialproducts"
              element={
                <RequireAuth>
                  <Semifinishedrawmaterialproducts />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/addsemifinishedrawmaterialproducts"
              element={
                <RequireAuth>
                  <Addsemifinishedrawmaterialproducts />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/supliers"
              element={
                <RequireAuth>
                  <Supliers />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/semifinishedrawmaterialproductsdetails/:id"
              element={
                <RequireAuth>
                  <Semifinishedrawmaterialproductsdetails />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/editsemifinishedrawmaterialproducts/:id"
              element={
                <RequireAuth>
                  <Editsemifinishedrawmaterialproducts />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/kitchenproducts/:id"
              element={
                <RequireAuth>
                  <KitchenProducts />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/productrecipe"
              element={
                <RequireAuth>
                  <ProductRecipe />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/updateproductrecipe/:product_id/:variant_id"
              element={
                <RequireAuth>
                  <UpdateProductRecipe />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/comingsoon"
              element={
                <RequireAuth>
                  <ComingSoon />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/customerinsights"
              element={
                <RequireAuth>
                  <CustomerInsights />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/crmcampaigns"
              element={
                <RequireAuth>
                  <CrmCampaigns />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/crmcampaignscreate"
              element={
                <RequireAuth>
                  <CrmCampaignsCreate />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/productaddons"
              element={
                <RequireAuth>
                  <ProductAddons />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/offers"
              element={
                <RequireAuth>
                  <Offers />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/createcoupon"
              element={
                <RequireAuth>
                  <CreateCoupon />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/editcoupon/:id"
              element={
                <RequireAuth>
                  <EditCoupons />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/orderinvoices"
              element={
                <RequireAuth>
                  <Orderinvoices />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/staffaccounts"
              element={
                <RequireAuth>
                  <Staffaccounts />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/customerfeedback"
              element={
                <RequireAuth>
                  <Customerfeedback />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/newtableorder/:id"
              element={
                <RequireAuth>
                  <Newtableorder />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/peruserorder/:id"
              element={
                <RequireAuth>
                  <PerUserOrder />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Pagenotfound />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/datatable" element={<DataTable />} />
            {/* <Route exact path="/loginpassword" element={<LoginPassword />} /> */}
          </Routes>
        </AuthContext.Provider>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
      </>
    );
  }
}

export default App;
