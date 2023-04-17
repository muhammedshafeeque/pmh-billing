import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ModuleSelector.scss";
import { MODULES } from "../../../Constants/constant";
function ModuleSelector() {
  const navigate = useNavigate();
  return (
    <div className="side_menu">
      {MODULES.map((item) => {
        return (
          <Box
            mt={2}
            key={item.code}
            onClick={() => {
              navigate(`${item.navigate}`);
            }}
            className="menu_item"
          >
            <Text ml={5}>{item.name}</Text>
          </Box>
        );
      })}
    </div>
  );
}

export default ModuleSelector;
