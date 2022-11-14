import { Layout } from "@shopify/polaris";
import { Suspense } from "react";
import Filter from "./Filter";
import Items from "./Items";
import Chart from "./Chart";
import Tabs from "./Tabs";
import Welcome from "./Welcome";
import Popup from "./Items/Popup";
import {
    withRouter
} from "react-router-dom";

function Dashboard({
    onSelectedTabs,
    onSelectedShop,
    shop
}){
    return (
        <Suspense fallback={""}>
            <Layout>
                <Layout.Section>
                    <div className="dashboard">
                        <Welcome></Welcome>
                        <Filter></Filter>
                        <Items></Items>
                        <div className="dashboard-content">
                            <Tabs></Tabs>
                            <div className="dashboard-chart"><Chart></Chart></div>
                        </div>
                        <Popup onSelectedShop={onSelectedShop} onSelectedTabs={onSelectedTabs} shop={shop}></Popup>
                    </div>
                </Layout.Section>
            </Layout>
        </Suspense>
    )
}

export default withRouter(Dashboard);