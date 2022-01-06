import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared/Layout";
import { LogicBoard } from "./shared/LogicBoard";
import { Route404 } from "./shared/Route404";
import { graphqlClient } from "./graphql/client";
import { useMeQuery, useAdminMeQuery } from "./graphql/generated";
import { AccountPage } from "./pages/account";
import { AdminPage } from "./pages/admin";
import { CreateProductPage } from "./pages/admin/create-product";
import { AllProductsPage } from "./pages/products";
import { CartPage } from "./pages/cart";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { ProductDetailPage } from "./pages/product-detail";
import { RegisterPage } from "./pages/register";

export function AppRouter() {
  const { data: meData } = useMeQuery(
    graphqlClient,
    {},
    { refetchInterval: 1000 }
  );

  const { data: adminMeData } = useAdminMeQuery(
    graphqlClient,
    {},
    { refetchInterval: 1000 }
  );

  return (
    <BrowserRouter>
      <LogicBoard>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminPage />} />

            {adminMeData?.adminMe && (
              <>
                <Route
                  path="/admin/create-product"
                  element={<CreateProductPage />}
                />
              </>
            )}

            {!meData?.me?.account && (
              <>
                <Route path="/account/register" element={<RegisterPage />} />
                <Route path="/account/sign-in" element={<LoginPage />} />
              </>
            )}

            <Route path="*" element={<Route404 />} />
          </Routes>
        </Layout>
      </LogicBoard>
    </BrowserRouter>
  );
}