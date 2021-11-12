import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import NewCustomer from "../pages/NewCustomer/NewCustomer";
import NotFound from "../pages/NotFound/NotFound";
import { Container } from "./style";



export default function Router() {

    return (
        <Container id={"root"}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route exact path={"/cliente/cadastro"} component={NewCustomer} />
                    <Route path={"*"} component={NotFound} />
                </Switch>
            </BrowserRouter>
        </Container>
    )
}