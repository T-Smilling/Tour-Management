import { Express } from "express";
import { tourRoute } from "./tour.route";
import { CategoriesRoute } from "./categories.route";
import { HomeRoute } from "./home.route";
import { CartRoute } from "./cart.model";
import { orderRoutes } from "./order.model";

const ClientRoute = (app:Express) :void => {
  app.use("/",HomeRoute);
  app.use("/tours",tourRoute);
  app.use("/categories",CategoriesRoute);
  app.use("/cart",CartRoute);
  app.use(`/order`, orderRoutes);
};

export default ClientRoute;
