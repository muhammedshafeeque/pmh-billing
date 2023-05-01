import React from "react";
import Header from "../../Components/Misc/Header/Header";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import RackList from "../../Components/Stock/RackList/RackList";
import SectionList from "../../Components/Stock/SectionList/SectionList";
function Stock() {
  return (
    <div>
      <Header />
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Stock</Tab>
          <Tab>Category</Tab>
          <Tab>Groupe</Tab>
          <Tab>Rack</Tab>
          <Tab>Section</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>one!</p>
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
