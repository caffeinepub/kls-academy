import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AdminPanel from "./pages/AdminPanel";
import Admission from "./pages/Admission";
import Affiliation from "./pages/Affiliation";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Examination from "./pages/Examination";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Result from "./pages/Result";
import Verification from "./pages/Verification";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const admissionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admission",
  component: Admission,
});
const coursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courses",
  component: Courses,
});
const examinationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/examination",
  component: Examination,
});
const affiliationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/affiliation",
  component: Affiliation,
});
const resultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/result",
  component: Result,
});
const verificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verification",
  component: Verification,
});
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: Payment,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanel,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  admissionRoute,
  coursesRoute,
  examinationRoute,
  affiliationRoute,
  resultRoute,
  verificationRoute,
  paymentRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
