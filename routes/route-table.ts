import { asPluginPage, type PluginRouteTable } from "@venore/plugin-sdk";
import AdminPage from "./admin/page";
import PublicPage from "./public/page";

export const calendarRouteTable: PluginRouteTable = {
  admin: [{ pattern: "", Component: asPluginPage(AdminPage) }],
  public: [{ pattern: "calendario", Component: asPluginPage(PublicPage) }],
};
