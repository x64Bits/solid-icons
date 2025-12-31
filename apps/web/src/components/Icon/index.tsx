import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { Match, Switch, useContext } from "solid-js";
import { AppContext } from "~/store/AppContext";
import { Flex, PulseView } from "../Common/styles";
import HighlightName from "../HighlightName";
import Glyph from "./Glyph";
import { IconContainer } from "./styles";

interface IIConProps {
  name: string;
  term: string;
}

export default function Icon(props: IIConProps) {
  const [_state, { setActiveIcon }] = useContext(AppContext);
  let el: HTMLButtonElement | undefined;
  const useVisibilityObserver = createVisibilityObserver({
    threshold: 0.1,
  });
  const visible = useVisibilityObserver(() => el);

  function handleActiveIcon() {
    setActiveIcon(props.name);
  }

  return (
    <IconContainer ref={el} onClick={handleActiveIcon}>
      <Switch>
        <Match when={visible()}>
          <Glyph name={props.name} />
        </Match>
        <Match when={!visible()}>
          <Flex justify="center">
            <PulseView size="2.8em" />
          </Flex>
        </Match>
      </Switch>
      <HighlightName name={props.name} term={props.term} />
    </IconContainer>
  );
}
