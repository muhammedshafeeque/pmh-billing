import React from "react";
import Header from "../../Components/Misc/Header/Header";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import RackList from "../../Components/Stock/RackList/RackList";
import SectionList from "../../Components/Stock/SectionList/SectionList";
import ItemList from "../../Components/Stock/ItemList/ItemList";
function Stock() {
  return (
    <div>
      <Header />
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Stock</Tab>
          <Tab>Category</Tab>
          <Tab>Items</Tab>
          <Tab>Rack</Tab>
          <Tab>Section</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel >
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <ItemList/>
          </TabPanel>
          <TabPanel>
            <RackList/>
          </TabPanel>
          <TabPanel>
            <SectionList/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Stock;
