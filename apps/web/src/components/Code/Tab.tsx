import { FaBrandsYarn } from "solid-icons/fa";
import { createMemo, JSX } from "solid-js";
import { Box, Row } from "../Common/styles";
import { TabContainer } from "./styles";

interface ITabProps {
  title?: string;
  icon?: JSX.Element;
  activeTab: number;
  index: number;
  onChange: (index: number) => void;
}

export default function Tab(tab: ITabProps) {
  function handleChangeTab() {
    tab.onChange(tab.index);
  }

  const active = createMemo(() => tab.activeTab === tab.index);

  return (
    <TabContainer active={active()} onClick={handleChangeTab}>
      <Row>
        <div>{tab.icon}</div>
        <Box pl="0.3em">{tab.title}</Box>
      </Row>
    </TabContainer>
  );
}
